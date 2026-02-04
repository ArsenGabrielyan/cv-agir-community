"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useThemeContext } from "@/context/theme-data-provider";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { ThemeColors } from "@/lib/types";
import { Theme } from "@/lib/types/enums";
import { useTranslations } from "next-intl";

const availableThemeColors = [
  { name: "Zinc", light: "bg-zinc-900", dark: "bg-zinc-700", title: Theme.Zinc},
  { name: "Rose", light: "bg-rose-600", dark: "bg-rose-700", title: Theme.Rose},
  { name: "Blue", light: "bg-blue-600", dark: "bg-blue-700", title: Theme.Blue},
  { name: "Green", light: "bg-green-600", dark: "bg-green-500", title: Theme.Green},
  { name: "Orange", light: "bg-orange-500", dark: "bg-orange-700", title: Theme.Orange},
];

export function ThemeColorToggle() {
  const { themeColor, setThemeColor } = useThemeContext();
  const { resolvedTheme } = useTheme();
  const t = useTranslations("theme");
  const createSelectItems = () => {
    return availableThemeColors.map(({ name, light, dark, title }) => (
      <SelectItem key={name} value={name}>
        <div className="flex item-center justify-center space-x-3">
          <div
            className={cn(
              "rounded-full",
              "w-[20px]",
              "h-[20px]",
              resolvedTheme === "light" ? light : dark,
            )}
          ></div>
          <div className="text-sm">{t(title)}</div>
        </div>
      </SelectItem>
    ));
  };

  return (
    <Select
      onValueChange={(value) => setThemeColor(value as ThemeColors)}
      defaultValue={themeColor}
    >
      <SelectTrigger className="w-[180px] ring-offset-transparent focus:ring-transparent" title={t("app-color.label")}>
        <SelectValue placeholder={t("app-color.label-select")} />
      </SelectTrigger>
      <SelectContent className="border-muted">
        {createSelectItems()}
      </SelectContent>
    </Select>
  );
}