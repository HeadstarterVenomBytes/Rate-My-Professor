import * as cheerio from "cheerio";
import axios from "axios";
import { parseCustomDate } from "./dateUtils";
import {
  Professor,
  ProfessorReview,
  YesNo,
  Attendance,
  Grade,
} from "@/types/professorDataTypes";

export async function scrapeProfessor(url: string): Promise<Professor | null> {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const getTextContent = (selector: string) => $(selector).text().trim();
    const parseIntFromText = (selector: string) =>
      parseInt(getTextContent(selector).split(" ")[0]) || 0;

    const name = getTextContent(".NameTitle__Name-dowf0z-0");
    const department = getTextContent(
      ".TeacherDepartment__StyledDepartmentLink-fl79e8-0"
    );
    const university = $("div.NameTitle__Title-dowf0z-1 a")
      .last()
      .text()
      .trim();
    const averageRating = parseFloat(
      getTextContent(".RatingValue__Numerator-qw8sqy-2.liyUjw")
    );
    const numRatings = parseIntFromText(".RatingValue__NumRatings-qw8sqy-0 a");

    const tags: string[] = [];
    $(".TeacherTags__TagsContainer-sc-16vmh1y-0 span").each((_, el) => {
      const text = $(el).text().trim();
      tags.push(text);
    });

    const reviews: ProfessorReview[] = $(".Rating__StyledRating-sc-1rhvpxz-1")
      .map((_, el) => {
        const $review = $(el);

        const getReviewTextContent = (selector: string): string =>
          $review.find(selector).first().text().trim();
        const parseReviewFloatFromText = (selector: string): number =>
          parseFloat(getReviewTextContent(selector)) || 0;
        const parseReviewIntFromText = (selector: string): number =>
          parseInt(getReviewTextContent(selector)) || 0;

        const metaItems = $review
          .find(".CourseMeta__StyledCourseMeta-x344ms-0")
          .map((_, item) => $(item).text().trim())
          .get();
        const getMetaItemValue = (keyword: string): string | undefined => {
          const metaItem = $review.find(
            `.MetaItem__StyledMetaItem-y0ixml-0:contains("${keyword}")`
          );
          if (metaItem.length > 0) {
            return metaItem.find("span").text().trim();
          }
          return undefined;
        };

        // Helper function to conditionally include metadata
        const getOptionalMetaValue = <T>(
          keyword: string,
          parse: (value: string) => T
        ): T | undefined => {
          const value = getMetaItemValue(keyword);
          if (value) {
            return parse(value);
          }
          return undefined;
        };

        return {
          quality:
            parseReviewFloatFromText(
              ".CardNumRating__CardNumRatingNumber-sc-17t4b9u-2.gcFhmN"
            ) || 0,
          difficulty:
            parseReviewFloatFromText(
              ".CardNumRating__CardNumRatingNumber-sc-17t4b9u-2.cDKJcc"
            ) || 0,
          course: getReviewTextContent(
            ".RatingHeader__StyledClass-sc-1dlkqw1-3.eXfReS"
          ),
          date: parseCustomDate(
            getReviewTextContent(".TimeStamp__StyledTimeStamp-sc-9q2r30-0")
          ),
          review: getReviewTextContent(".Comments__StyledComments-dzzyvm-0"),
          helpfulVotes: parseReviewIntFromText(
            ".Thumbs__HelpTotalNumber-sc-19shlav-2:eq(0)"
          ),
          unhelpfulVotes: parseReviewIntFromText(
            ".Thumbs__HelpTotalNumber-sc-19shlav-2:eq(1)"
          ),
          textbook: getOptionalMetaValue("Textbook", value => value === "Yes" ? YesNo.Yes : YesNo.No),
          forCredit: getOptionalMetaValue("For Credit", value => value === "Yes" ? YesNo.Yes : YesNo.No),
          attendence: getOptionalMetaValue("Attendance", value => value === "Mandatory" ? Attendance.Mandatory : Attendance.NotMandatory),
          grade: getMetaItemValue("Grade") as Grade | undefined,
          wouldTakeAgain: getOptionalMetaValue("Would Take", value => value === "Yes" ? YesNo.Yes : YesNo.No),
          tags: $review
            .find(".Tag-bs9vf4-0")
            .map((_, tag) => $(tag).text().trim())
            .get(),
        } as ProfessorReview;
      })
      .get();

    const professor: Professor = {
      name,
      department,
      university,
      averageRating,
      numRatings,
      tags,
      reviews,
    };

    return professor;
  } catch (error) {
    console.error("Error scraping professor data:", error);
    return null;
  }
}
