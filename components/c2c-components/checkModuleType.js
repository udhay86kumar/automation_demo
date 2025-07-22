export const CheckModuleType = (moduleAttributeValue) => {
  // Check the type of the module and return the appropriate value
  switch (moduleAttributeValue) {
    case "StudentInstruction":
      return "StudentInstruction";
    case "TeacherInstruction":
      return "TeacherInstruction";
    case "Multichoice":
      return "Multichoice";
    case "Multiselect":
      return "Multiselect";
    case "ShortText":
      return "ShortText";
    case "Upload":
      return "Upload";
    case "Cloze":
      return "Cloze";
    case "ClozeDragDrop":
      return "ClozeDragDrop";
    case "ClozeMultichoice":
      return "ClozeMultichoice";
    case "ClozeMath":
      return "ClozeMath";
    case "ClozeCombo":
      return "ClozeCombo";
    case "ImageLabel":
      return "ImageLabel";
    case "ImageLabelMultichoice":
      return "ImageLabelMultichoice";
    case "ImageLabelDragDrop":
      return "ImageLabelDragDrop";
    case "ImageLabelMultichoice":
      return "ImageLabelMultichoice";
    case "Draw":
      return "Draw";
    case "ChoiceMatrix":
      return "ChoiceMatrix";
    case "ChoiceMatrixMulti":
      return "ChoiceMatrixMulti";
    case "MultipartActivity":
      return "MultipartActivity";
    case "ArticleQuestion":
      return "ArticleQuestion";
    case "ImageQuestion":
      return "ImageQuestion";
    default:
      return "";
  }
};
