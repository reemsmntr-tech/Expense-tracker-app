import classes from "./foter.module.css";

export default function Footer() {
  return (
    <footer className={classes["footer"]}>
      <p className={classes["footer-text"]}>
        © {new Date().getFullYear()} Hsoub Academy. All rights reserved.
      </p>
    </footer>
  );
}
