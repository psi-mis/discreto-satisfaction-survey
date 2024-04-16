$(document).ready(function () {
  //Section 1

  //Question2
  const discretoServiceDeliveredBy = $("#discreto-service-delivered-by-dropdown");
  //LikerSection
  const questions = {
    question1: $("#question-1"),
    question2: $("#question-2"),
    question3: $("#question-3"),
    question4: $("#question-4"),
  };

  

  //Section 3
  //Question1
  const volunteerServiceYes = $("#volunteer-service-yes");
  const volunteerServiceNo = $("#volunteer-service-no");
  //Question1
  const vihTestExplainedYes = $("#vih-test-explained-yes");
  const vihTestExplainedNo = $("#vih-test-explained-no");
  //Question2

  //Question3
  const verbalInformationAcceptanceYes = $("#verbal-information-acceptance-yes");
  const verbalInformationAcceptanceNo = $("#verbal-information-acceptance-no");
  //Question4
  const privacyViolationInformationYes = $("#privacy-violation-information-yes");
  const privacyViolationInformationNo = $("#privacy-violation-information-no");
  //Question5
  const privacyViolationDropdown = $("#privacy-violation-dropdown");

  //Question6
  const securityRiskDropdown = $("#security-risk-dropdown");
  //Question7
  const makeComplaintYes = $("#make-a-complaint-yes");
  const makeComplaintNo = $("#make-a-complaint-no");
  const makeComplaintText = $("#make-a-complaint-text");
  //Question8
  const followUpServiceOfferedYes = $("#follow-up-service-offered-yes");
  const followUpServiceOfferedNo = $("#follow-up-service-offered-no");

  //Question9
  const customerPhoneNumber = $("#customer-phone-number");

  //Question10
  const customerName = $("#customer-name");

  //sections
  const makeComplaintSection = $(".make-a-complaint-text-section");


  $("#customer-phone-number").on("input", function () {
    $(this).val(function (_, value) {
      return value.replace(/\D/g, "");
    });
  });
  $("#customer-name").on("input", function () {
    $(this).val(function (_, value) {
      return value.replace(/[^A-Za-z]/g, "");
    });
  });
  var currentStep = 1;
  var maxSteps = 3;

  const $btnNext = $("#next");
  const $btnBack = $("#back");
  const $btnSend = $("#send");

  const likerSection = $("#liker-section");
  const contactInfoSection = $(".contact-info-section");


  var isSection3Completed = false;
  var isSection4Completed = false;

  const sections = {
    section1: $("#section1"),
    section2: $("#section2"),
    section3: $("#section3"),
    section4: $("#section4")
  };



  const likerSectionQuestions = $("#liker-section .answer-selected");


  const section2Questions = [
    
  ]


  const section3Inputs = [
    volunteerServiceYes,
    volunteerServiceNo,
    vihTestExplainedNo,
    vihTestExplainedYes,
    verbalInformationAcceptanceNo,
    verbalInformationAcceptanceYes,
    privacyViolationInformationNo,
    privacyViolationInformationYes,
   
    makeComplaintYes,
    makeComplaintNo,
    followUpServiceOfferedYes,
    followUpServiceOfferedNo,
  ];

  initialize();

  function initialize() {
    hideSectionsExcept("section1");
    hideSectionsWithClass("disabledbutton");
    $btnBack.hide();
    $btnNext.show();

    $btnNext.on("click", nextStep);
    $btnBack.on("click", backStep);
    $btnSend.on("click", sendSurvey);

    $(".opt").click(handleIconClick);
    $(".opt").click(enableNextQuestion);
    $(".opt").click(enableSectionsWithSelectedOptions);
    $(".opt").click(checkSection2Wrapper);

    //$(".opt").click(enableLikerNextButton);

    initializeLikerSectionQuestions();
    initializeSection2Inputs();
    initializeSection3Inputs();

  }
  function sendSurvey() {
    nextStep();
    $btnBack.hide();
    $btnNext.hide();
    $btnSend.hide();
  }
  function initializeLikerSectionQuestions() {
    likerSectionQuestions.each((index, element) => {
      $(element).click(checkSection3Wrapper);
    });
  }

  function initializeSection2Inputs() {
    section2Questions.forEach((question) => {
      question.click(checkSection2Wrapper);
    })
    discretoServiceDeliveredBy.on("change", checkSection2Wrapper);
  }

  function initializeSection3Inputs() {
    makeComplaintSection.hide();
    contactInfoSection.hide();
    section3Inputs.forEach((group) => {
      group.click(checkSection3Wrapper);
    });
    followUpServiceOfferedNo.click(enableSection3HiddenQuestions);
    followUpServiceOfferedYes.click(enableSection3HiddenQuestions);
    makeComplaintYes.click(enableSection3HiddenQuestions);
    makeComplaintNo.click(enableSection3HiddenQuestions);
    customerName.on("input", checkSection3Wrapper);
    customerPhoneNumber.on("input", checkSection3Wrapper);
    makeComplaintText.on("input", checkSection3Wrapper);
    privacyViolationDropdown.on("change",checkSection3Wrapper);
    securityRiskDropdown.on("change",checkSection3Wrapper);
  }



  function hideSectionsExcept(sectionName) {
    Object.keys(sections).forEach((key) => {
      if (key !== sectionName) {
        sections[key].hide();
      }
    });
  }

  function hideSectionsWithClass(className) {
    Object.keys(questions).forEach((key, index) => {
      if (index == 0) {
        return;
      }
      questions[key].addClass(className);
    });
  }

  function setStepVisibility(step, isVisible) {
    console.log(step);
    console.log(isVisible);
    sections[step].toggle(isVisible);
  }

  function setNextActiveStep(stepNumber) {
    $(".step" + stepNumber - 1).removeClass("active");
    $(".wrapper").animate({ scrollTop: 0 }, "slow");
    $(".step" + stepNumber).addClass("active");
  }

  function setPreviousActiveStep(stepNumber) {

    $(".step" + (stepNumber + 1)).removeClass("active");
    $(".wrapper").animate({ scrollTop: 0 }, "slow");
    $(".step" + stepNumber).addClass("active");
  }

  function nextStep() {
    setStepVisibility("section" + currentStep, false);
    currentStep++;

    setStepVisibility("section" + currentStep, true);
    setNextActiveStep(currentStep);
    $btnNext.toggle(currentStep < maxSteps);
    $btnBack.toggle(currentStep > 1);

    enableNextButton(
      currentStep,
      isSection2Completed(),
      isSection3Completed,
    );
  }

  function backStep() {
    setStepVisibility("section" + currentStep, false);
    currentStep--;
    setStepVisibility("section" + currentStep, true);
    setPreviousActiveStep(currentStep);
    $btnBack.toggle(currentStep > 1);
    $btnSend.hide();
    $btnNext.show();
  }

  function enableNextButton(
    step,
    section2Completed,
    section3Completed,
  ) {
    console.log(maxSteps, step)
    if (step === 2 && section2Completed) {
      $btnNext.show();
    } else if (step === maxSteps && section3Completed) {
      console.log("here");
      $btnSend.show();
    } else {
      $btnSend.hide();
      $btnNext.hide();
    }
  }

  function handleIconClick() {
    const selectedValue = $(this).data("value");
    const step3QuizContainer = $(this).closest(".question");

    step3QuizContainer.find(".optns").hide();
    const answerSelected = step3QuizContainer.find(".answer-selected");
    answerSelected
      .html($(this).clone())
      .show()
      .data("value", selectedValue)
      .off("click")
      .addClass("final-" + $(this).prop("id"))
      .click(function () {
        disableAllOtherQuestions($(this));
        $(this).hide().empty();
        $btnNext.hide();
        step3QuizContainer.find(".optns").show();
      });
  }

  function enableNextQuestion() {
    var clickedElementId = $(this).attr("id");

    switch (clickedElementId) {
        case "answer1":
            questions.question2.removeClass("disabledbutton");
            questions.question2.addClass("currentSelection");
            break;
        case "answer2":
            questions.question2.removeClass("currentSelection");
            questions.question3.removeClass("disabledbutton");
            questions.question3.addClass("currentSelection");
            break;
        case "answer3":
            questions.question3.removeClass("currentSelection");
            questions.question4.removeClass("disabledbutton");
            questions.question4.addClass("currentSelection");
            break;
        default:
            break;
    }
}

function enableSectionsWithSelectedOptions() {
    const clickedElementId = $(this).attr("id");

    const questions = [
        $("#question-1"),
        $("#question-2"),
        $("#question-3"),
        $("#question-4")

    ];
    const clickedQuestion = questions.find(
        (question) => clickedElementId == question.find(".opt").attr("id")
    );

    const remainingQuestions = questions.filter(
        (question) => clickedElementId != question.find(".opt").attr("id")
    );
    for (let question of remainingQuestions) {
        if (
            question.find(".answer-selected").children().length == 1 ||
            question.hasClass("currentSelection")
        )
            question.removeClass("disabledbutton");
    }
}

function disableAllOtherQuestions(section) {
    const questions = [
        $("#question-1"),
        $("#question-2"),
        $("#question-3"),
        $("#question-4")

    ];
    const clickedQuestion = questions.find(
        (question) =>
            section.find(".opt").attr("id") == question.find(".opt").attr("id")
    );

    const remainingQuestions = questions.filter(
        (question) =>
            section.find(".opt").attr("id") != question.find(".opt").attr("id")
    );

    clickedQuestion.find(".answer-selected").children == 0;

    if (clickedQuestion.find(".answer-selected").children().length == 1) {
        for (let question of remainingQuestions) {
            question.addClass("disabledbutton");
        }
    }
}


  function checkSection2Wrapper() {
    $btnNext.toggle(isSection2Completed());
  }

  function isSection2Completed() {
    return  (discretoServiceDeliveredBy.val() != null) && isLikerSectionCompleted();
  }

  function isLikerSectionCompleted() {
    return likerSectionQuestions
      .toArray()
      .every((question) => $(question).children().length !== 0);
  }

  function checkSection3Wrapper() {
    checkSection3();
    $btnSend.toggle(isSection3Completed);
  }

  function checkSection3() {
    isSection3Completed = false;
    let volunteerServiceCompleted = volunteerServiceYes.is(":checked") || volunteerServiceNo.is(":checked");
    let vhiTestExplainedCompleted = vihTestExplainedYes.is(":checked") || vihTestExplainedNo.is(":checked");
    let verbalInformationAcceptanceCompleted = verbalInformationAcceptanceYes.is(":checked") || verbalInformationAcceptanceNo.is(":checked");
    let privacyViolationCompleted = privacyViolationInformationYes.is(":checked") || privacyViolationInformationNo.is(":checked");
    let privacyViolationDropdownCompleted = privacyViolationDropdown.val() != null;
    let securityRiskDropdownCompleted = securityRiskDropdown.val() != null;
    let makeComplaintCompleted = (makeComplaintYes.is(":checked") && makeComplaintText.val().trim() != "") || makeComplaintNo.is(":checked");
    let followUpServiceOfferedCompleted = (followUpServiceOfferedYes.is(":checked") && customerName.val().trim() != "" && customerPhoneNumber.val().trim() != "") || followUpServiceOfferedNo.is(":checked");

    if (vhiTestExplainedCompleted && verbalInformationAcceptanceCompleted && privacyViolationCompleted && privacyViolationDropdownCompleted && securityRiskDropdownCompleted && makeComplaintCompleted && followUpServiceOfferedCompleted && volunteerServiceCompleted) {
      isSection3Completed = true;
    }
  }



  function enableSection3HiddenQuestions() {
    if (makeComplaintYes.is(":checked")) {
      makeComplaintSection.show();
    } else {
      makeComplaintSection.hide();
    }
    if (followUpServiceOfferedYes.is(":checked")) {
      contactInfoSection.show();
    } else {
      contactInfoSection.hide();
    }
  }

});
