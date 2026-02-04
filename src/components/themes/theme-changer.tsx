import { ButtonGroup } from "../ui/button-group";
import { ThemeColorToggle } from "./theme-color-toggle";
import { ThemeModeToggle } from "./theme-toggler";

const ThemeSettings = () => (
     <ButtonGroup>
          <ThemeColorToggle/>
          <ThemeModeToggle/>
     </ButtonGroup>
)
export default ThemeSettings