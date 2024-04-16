const NEXT_STEP_KEY = "nextStep";
const PREVIOUS_STEP_KEY = "previousStep";
const SECTION_1_NAME = "section1";
const SECTION_2_NAME = "section2";
const SECTION_3_NAME = "section3";
const SECTION_4_NAME = "section4";
const SECTION_5_NAME = "section5";
const ACTIVE_PROGRESS_CLASS_NAME = "active";
const PROGRESS_BAR_CLASS_NAME = "step";
const BTN_NEXT_ID = "next";
const BTN_SEND_ID = "send";
const BTN_BACK_ID = "back";

$(document).ready(function () {
  const survey = {
    currentStep: 1,
    maxSteps: 4,
    sections: [], // use jquery objects here
    questions: {
      section1: {
        required: [],
        optional: [],
      },
      section2: {
        required: [],
        optional: [],
      },
      section3: {
        required: [],
        optional: [],
      },
      section4: {
        required: [],
        optional: [],
      },
    }, // use jquery objects here
    btns: {
      next: $(`#${BTN_NEXT_ID}`),
      send: $(`#${BTN_SEND_ID}`),
      back: $(`#${BTN_BACK_ID}`),
    },

    isSectionComplete: function (section) {
      isComplete = true;
      section.required.forEach((question) => {
        if (question.val() === "" || question.val() == undefined) {
          isComplete = false;
        }
      });

      return isComplete;
    },

    showElement: function (htmlElement) {
      htmlElement.show();
    },

    hideElement: function (htmlElement) {
      htmlElement.hide();
    },

    continueNextPage: function () {
      this.currentStep++;
      currentIndex = this.currentStep - 1;
      this.showElement(this.sections[currentIndex]);
      this.hideElement(this.sections[currentIndex - 1]);
      this.updateProgressBar(NEXT_STEP_KEY);
      //this.checkSection(this.sections[currentIndex]);
    },

    returnLastPage: function () {
      this.currentStep--;
      currentIndex = this.currentStep + 1;
      this.showElement(this.sections[currentIndex]);
      this.hideElement(this.sections[currentIndex + 1]);
      this.updateProgressBar(PREVIOUS_STEP_KEY);
    },

    bindButtonEvents: function () {
      this.btns.back.click(this.returnLastPage.bind(this));
      this.btns.next.click(this.continueNextPage.bind(this));
      this.btns.send.click(this.sendSurvey.bind(this));
    },

    sendSurvey: function () {
      this.continueNextPage();
      this.hideElement(this.btns.back);
      this.hideElement(this.btns.send);
      this.hideElement(this.btns.next);
    },

    updateProgressBar: function (stepKey) {
      switch (stepKey) {
        case NEXT_STEP_KEY:
          //$(`.${PROGRESS_BAR_CLASS_NAME}${this.currentStep + 1}`).removeClass(
          //ACTIVE_PROGRESS_CLASS_NAME
          //);
          $(`.${PROGRESS_BAR_CLASS_NAME}${this.currentStep}`).addClass(
            ACTIVE_PROGRESS_CLASS_NAME
          );
        case PREVIOUS_STEP_KEY:
          $(`.${PROGRESS_BAR_CLASS_NAME}${this.currentStep - 1}`).removeClass(
            ACTIVE_PROGRESS_CLASS_NAME
          );
          $(`.${PROGRESS_BAR_CLASS_NAME}${this.currentStep}`).addClass(
            ACTIVE_PROGRESS_CLASS_NAME
          );
        default:
          break;
      }
    },

    addQuestions: function () {
      this.questions.section2.required = [
        $(`input[name='service-provided-radio-group']`),
      ];
    },

    constructor: function () {
      this.sections = [
        $(`#${SECTION_1_NAME}`),
        $(`#${SECTION_2_NAME}`),
        $(`#${SECTION_3_NAME}`),
        $(`#${SECTION_4_NAME}`),
        $(`#${SECTION_5_NAME}`),
      ];

      this.addQuestions();

      this.hideElement(this.btns.back);
      this.hideElement(this.btns.send);
      this.showElement(this.btns.next);

      this.sections.forEach((section, index) => {
        if (index == 0) {
          this.showElement(section);
        } else {
          this.hideElement(section);
        }
      });

      this.bindButtonEvents();
    },
  };

  survey.constructor();
  survey.btns.next(
    checkSection(survey, survey.sections[survey.currentIndex - 1])
  );
});

function checkSection(survey, section) {
  console.log("checkingSection");
  let sectionID = section.attr("id");

  if (sectionID == SECTION_1_NAME) {
  } else if (sectionID == SECTION_5_NAME) {
    survey.hideElement(survey.btns.back);
    survey.hideElement(survey.btns.send);
    survey.hideElement(survey.btns.next);
    //this is acopled to specific sections, do we need to add another logic to this be more dynamic?
  } else if (
    (sectionID == SECTION_1_NAME ||
      sectionID == SECTION_2_NAME ||
      sectionID == SECTION_3_NAME) &&
    survey.isSectionComplete(this.questions[sectionID])
  ) {
    survey.showElement(this.btns.next);
  } else if (sectionID == SECTION_5_NAME && survey.isSectionComplete(section)) {
    survey.showElement(this.btns.send);
  } else {
    survey.hideElement(this.btns.next);
    survey.hideElement(this.btns.send);
  }
}
