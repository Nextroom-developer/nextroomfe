import ThemeTextField from "@/(shared)/components/ThemeTextField/Container";
import { useSelectedThemeValue } from "@/(shared)/atoms/selectedTheme.atom";
import {
  hintCountTextFieldProps,
  nameTextFieldProps,
  timeTextFieldProps,
} from "@/admin/(components)/CreateTheme/createTheme";

export default function DialogBody() {
  const selectedTheme = useSelectedThemeValue();

  return (
    <div className="theme-info-modal__content">
      <ThemeTextField
        {...nameTextFieldProps}
        content={selectedTheme.title}
        infoText=""
      />
      <div className="info-grid">
        <ThemeTextField
          {...timeTextFieldProps}
          content={selectedTheme.timeLimit.toString()}
        />
        <ThemeTextField
          {...hintCountTextFieldProps}
          content={selectedTheme.hintLimit.toString()}
        />
      </div>
    </div>
  );
}
