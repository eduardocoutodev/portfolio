# Resume source

`main.tex` is the editable source for the website's Download CV button. It was
copied from `/Users/eduardocouto/Code/ai-job-search/cv/main_example.tex` and updated
to reflect the backend and AI experience agreed in the LinkedIn profile chat.
The original job-search copy is unchanged; future website resume edits belong here.

1. Edit `cv/main.tex`.
2. Run `pnpm cv:build` from the repository root.
3. Review `public/eduardo_couto_resume.pdf` before committing both files.

The default public CV is one page. Extra skills, earlier roles, and additional
achievement details stay in `main.tex` inside `\ifextendedcv ... \fi` blocks.
Change `\extendedcvfalse` to `\extendedcvtrue` to include them when tailoring a
role-specific version. Switch it back to `\extendedcvfalse` before rebuilding
the website download. The extended version can exceed one page.

Requires LuaLaTeX and the `moderncv`, `needspace`, and `import` packages
(e.g. through TeX Live or MacTeX). Compilation uses a temporary directory so
LaTeX auxiliary files stay out of the repository. The generated PDF keeps the
existing `/eduardo_couto_resume.pdf` download URL.
