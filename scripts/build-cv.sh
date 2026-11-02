#!/bin/sh
set -eu

cd "$(dirname "$0")/.."

# macOS BasicTeX/MacTeX installations do not always add TeX to PATH.
if ! command -v lualatex >/dev/null 2>&1 && [ -x /Library/TeX/texbin/lualatex ]; then
  PATH="/Library/TeX/texbin:$PATH"
  export PATH
fi

build_dir=$(mktemp -d)
trap 'rm -rf "$build_dir"' EXIT

lualatex -interaction=nonstopmode -halt-on-error -output-directory="$build_dir" cv/main.tex
lualatex -interaction=nonstopmode -halt-on-error -output-directory="$build_dir" cv/main.tex
cp "$build_dir/main.pdf" public/eduardo_couto_resume.pdf
