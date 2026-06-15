"""
Blurs client branding out of the healthcare-app screenshots so the portfolio
showcase reads as a generic cross-platform product, not a specific client.

Three classes of regions are handled:

  - WORDMARK_REGIONS: the big centered logotype on the splash and sign-in
    screens (IMG_0011, IMG_0012).
  - DIALOG_REGIONS: native-permission dialogs that print the bundle id
    (IMG_0014, IMG_0015).
  - HEADER_ICON: the small green mark sitting between the avatar and the card
    icon at the top of every in-app screen.

Coordinates are expressed as fractions of the image size so the script works
even if the source export ever ships at a different resolution.

Run from anywhere:
    python3 scripts/blur_branding.py
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / "public" / "images" / "projects" / "healthcare-app"

# WebP quality. The screenshots are mostly flat UI on white so 82 keeps the
# blur edges clean while cutting the bundle ~87% vs PNG.
WEBP_QUALITY = 82

HEADER_ICON = (0.36, 0.085, 0.64, 0.180)

# Stems (no extension) so the same lookup works whether we re-process from PNG
# sources or re-run against the WebP output. Coords were measured against the
# actual 1419x2796 screenshots with a fractional grid overlay.
WORDMARK_REGIONS = {
    # Splash logo + "POWERED BY ONEARK" tagline. Right edge extends past the
    # green X terminal of "pharmpix".
    "IMG_0011-portrait": [(0.10, 0.50, 0.80, 0.66)],
    # Sign-in logo + tagline (sits above the Email field).
    "IMG_0012-portrait": [(0.10, 0.29, 0.80, 0.45)],
}

DIALOG_REGIONS = {
    # iOS "Permitir que la app cex-pharmpix use tu ubicación" dialog title
    # — three-line title sitting above the body copy.
    "IMG_0014-portrait": [(0.08, 0.25, 0.92, 0.49)],
    # iOS "cex-pharmpix quiere enviarte notificaciones" dialog title.
    "IMG_0015-portrait": [(0.08, 0.40, 0.92, 0.58)],
}

NO_HEADER_ICON = {
    "IMG_0011-portrait",
    "IMG_0012-portrait",
    "IMG_0013-portrait",
}

BLUR_RADIUS = 28


def blur_region(image: Image.Image, frac_box: tuple[float, float, float, float]) -> None:
    w, h = image.size
    left = int(frac_box[0] * w)
    top = int(frac_box[1] * h)
    right = int(frac_box[2] * w)
    bottom = int(frac_box[3] * h)
    crop = image.crop((left, top, right, bottom)).filter(ImageFilter.GaussianBlur(BLUR_RADIUS))
    image.paste(crop, (left, top))


def process(path: Path) -> tuple[bool, Path]:
    image = Image.open(path).convert("RGBA")

    regions: list[tuple[float, float, float, float]] = []
    stem = path.stem

    if stem in WORDMARK_REGIONS:
        regions.extend(WORDMARK_REGIONS[stem])
    if stem in DIALOG_REGIONS:
        regions.extend(DIALOG_REGIONS[stem])
    if stem not in NO_HEADER_ICON:
        regions.append(HEADER_ICON)

    out_path = path.with_suffix(".webp")

    for box in regions:
        blur_region(image, box)

    image.save(out_path, format="WEBP", quality=WEBP_QUALITY, method=6)

    # Drop the source PNG so the public/ tree only ships the WebP.
    if path.suffix.lower() == ".png":
        path.unlink()

    return (len(regions) > 0, out_path)


def main() -> int:
    if not SRC_DIR.is_dir():
        print(f"missing source dir: {SRC_DIR}", file=sys.stderr)
        return 1

    files = sorted(list(SRC_DIR.glob("IMG_*-portrait.png")) + list(SRC_DIR.glob("IMG_*-portrait.webp")))
    if not files:
        print(f"no portrait screenshots found in {SRC_DIR}", file=sys.stderr)
        return 1

    touched = 0
    for path in files:
        blurred, out_path = process(path)
        if blurred:
            touched += 1
            print(f"blurred: {out_path.name}")

    print(f"\nprocessed {touched}/{len(files)} files")
    return 0


if __name__ == "__main__":
    sys.exit(main())
