import * as cheerio from "cheerio";
import axios from "axios";
import {
  Professor,
  ProfessorReview,
  YesNo,
  Attendance,
  Grade,
} from "@/types/professorDataTypes";

// Helper functions for extracting and parsing data
const extractText = ($: cheerio.CheerioAPI, selector: string): string =>
  $(selector).text().trim();

const extractYesNo = (text: string): YesNo =>
  text.includes("Yes") ? YesNo.Yes : YesNo.No;

const extractAttendance = (text: string): Attendance =>
  text.includes("Mandatory") ? Attendance.Mandatory : Attendance.NotMandatory;

const extractGrade = (text: string): Grade => text as Grade; // Direct cast, validation may be needed based on actual data

export async function scrapeProfessorPage(
  url: string
): Promise<Professor | null> {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // TODO: look into `cheerio.extract()`

    const name = extractText($, ".NameTitle__Name-sc-19innry-0");
    const department = extractText(
      $,
      ".TeacherDepartment__StyledDepartmentLink-fl79e8-0 > b:nth-child(1)"
    );
    const university = extractText(
      $,
      ".NameTitle__Title-dowf0z-1 > a:nth-child(2)"
    );
    const averageRating =
      parseFloat(extractText($, ".RatingValue__Numerator-qw8sqy-2")) || 0;
    const numRatings =
      parseInt(
        extractText(
          $,
          ".RatingValue__NumRatings-qw8sqy-0 > div:nth-child(1) > a:nth-child(1)"
        ).split(" ")[0]
      ) || 0;

    const tags = $(".TeacherTags__TagsContainer-sc-16vmh1y-0 span")
      .map((_, el) => $(el).text().trim())
      .get();

    const reviews: ProfessorReview[] = $(".Rating__RatingInfo-sc-1rhvpxz-3")
      .map((_, el) => {
        const $review = $(el);

        return {
          quality:
            parseFloat(
              extractText($, ".RatingValues__RatingValue-sc-6dc747-0:eq(0)")
            ) || 0,
          difficulty: parseFloat(
            extractText($, ".RatingValues__RatingValue-sc-6dc747-0:eq(1)")
          ),
          course: extractText($, "RatingHeader__StyledClass-sc-1dlkqw1-3"),
          date: new Date(
            Date.parse(
              extractText($, ".TimeStamp__StyledTimeStamp-sc-9q2r30-0")
            )
          ),
          review: extractText($, ".Comments__StyledComments-dzzyvm-0"),
          helpfulVotes:
            parseInt(
              extractText($, ".Thumbs__HelpfulNumber-sc-14ud573-1:eq(0)")
            ) || 0,
          unhelpfulVotes:
            parseInt(
              extractText($, ".Thumbs__HelpfulNumber-sc-14ud573-1:eq(0)")
            ) || 0,
          // TODO: figure out how to do the metadata tags
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
      reviews,
      tags,
    };

    return professor;
  } catch (error) {
    console.error("Error scraping professor data:", error);
    return null;
  }
}
