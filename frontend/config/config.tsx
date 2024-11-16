import React, { Component, ReactElement } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IconType } from "react-icons";
import { IoIosSettings, IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { MdLogout } from "react-icons/md";

export const HeaderLinks: { href: string; label: string }[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tags", label: "Tags" },
  { href: "/calendar", label: "Calendar" },
];

export const UserMenuLinks: {
  href: string;
  label: string;
  icon: ReactElement<IconType>;
}[] = [
  { href: "/profile", label: "Profile", icon: <FaUserCircle /> },
  { href: "/settings", label: "Settings", icon: <IoMdSettings /> },
  // { href: "/logout", label: "Logout", icon: <MdLogout /> },
];

export const TypingTextBase = "Find ";
export const TypingText: string[] = [
  "Study Groups",
  "Free Food",
  "Organizations",
  "Career Opportunities",
  "Friends",
];
