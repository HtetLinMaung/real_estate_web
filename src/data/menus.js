import { v4 } from "uuid";

const settingId = v4();

export const menus = [
  {
    _id: settingId,
    menuName: "Settings",
    icon: "fas fa-cog",
    url: "",
    isParent: true,
    parentId: "-",
  },
  {
    _id: v4(),
    menuName: "Menu",
    icon: "fas fa-bars",
    url: "/admin/settings/menus",
    isParent: false,
    parentId: settingId,
  },
];
