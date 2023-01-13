export const getColor = (item: any): any => {
  if (item.itemType() === "launch") {
    if (item.result.toUpperCase() === "SUCCESS") {
      return {
        color: "success.main",
        badgeColor: "success",
        jp: "成功",
        en: "Success",
      };
    }
    if (item.result.toUpperCase() === "FAILED") {
      return {
        color: "error.main",
        badgeColor: "error",
        jp: "失敗",
        en: "Failed",
      };
    }
    if (item.result.toUpperCase() === "PARTIAL_FAILED") {
      return {
        color: "warning.main",
        badgeColor: "warning",
        jp: "部分失敗",
        en: "Partial Failed",
      };
    }
  }

  const dt_now = new Date();
  if (item.datetime < dt_now.toISOString()) {
    dt_now.setHours(dt_now.getHours() + 2);
    if (item.datetime > dt_now.toISOString()) {
      return {
        color: "info.main",
        badgeColor: "info",
        jp: "進行中",
        en: "In Progress",
      };
    }
    return {
      color: "text.disabled",
      badgeColor: "primary",
      jp: "終了",
      en: "Ended",
    };
  }
  return {
    color: "text.primary",
    badgeColor: "secondary",
    jp: "予定",
    en: "Scheduled",
  };
};
