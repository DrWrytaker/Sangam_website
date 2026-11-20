import os
from PIL import Image, ImageDraw, ImageFilter

MEDIA_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "media")

def apply_rounded_privacy_pill(img, box, radius=12, dot_count=8):
    """
    Applies Gaussian blur + Kirana Mint frost (#E0F3F5) + privacy dots over box.
    box format: (x1, y1, x2, y2)
    """
    x1, y1, x2, y2 = box
    w, h = x2 - x1, y2 - y1
    if w <= 0 or h <= 0:
        return
        
    cropped = img.crop(box)
    blurred = cropped.filter(ImageFilter.GaussianBlur(radius=radius))
    
    # Rounded mask
    corner_r = min(6, h // 2)
    mask = Image.new("L", (w, h), 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.rounded_rectangle((0, 0, w, h), radius=corner_r, fill=255)
    
    # Soft sage/mint frost to match Kirana theme #E0F3F5
    frost = Image.new("RGBA", (w, h), (224, 243, 245, 185))
    blurred_rgba = blurred.convert("RGBA")
    blended = Image.alpha_composite(blurred_rgba, frost).convert("RGB")
    
    img.paste(blended, box, mask)
    
    # Border & Privacy Dots
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((x1, y1, x2, y2), radius=corner_r, outline=(175, 210, 214), width=1)
    
    if dot_count > 0 and w > 40:
        step = min(13, (w - 20) // max(1, dot_count - 1))
        cx = x1 + (w - (step * (dot_count - 1))) // 2
        cy = (y1 + y2) // 2
        for i in range(dot_count):
            draw.ellipse((cx + i * step - 2, cy - 2, cx + i * step + 2, cy + 2), fill=(0, 109, 119))


def process_all():
    print("Masking all phone numbers and PII on Sangam screenshots...")
    
    # 1. Main Ledger Screen
    p1 = os.path.join(MEDIA_DIR, "WhatsApp Image 2026-07-10 at 10.51.42 PM.jpeg")
    if os.path.exists(p1):
        im = Image.open(p1)
        boxes = [
            (298, 303, 458, 335), # Ramesh Gupta
            (256, 423, 422, 455), # Kavita Devi
            (298, 543, 466, 575), # Mohan Sharma
            (276, 655, 444, 687), # Sunita Singh
            (266, 770, 432, 802), # Raju Prasad
            (274, 890, 440, 922), # Priya Kumari
            (278, 1000, 446, 1032) # Vikram Yadav
        ]
        for b in boxes:
            apply_rounded_privacy_pill(im, b, radius=12, dot_count=8)
        out_path = os.path.join(MEDIA_DIR, "screen_ledger_main.jpg")
        im.save(out_path, quality=95)
        print(" -> screen_ledger_main.jpg saved.")

    # 2. Today's Collection Screen
    p2 = os.path.join(MEDIA_DIR, "WhatsApp Image 2026-07-10 at 10.53.04 PM.jpeg")
    if os.path.exists(p2):
        im = Image.open(p2)
        boxes = [
            (298, 730, 458, 762), # Ramesh Gupta
            (256, 850, 422, 882), # Kavita Devi
            (298, 965, 466, 997), # Mohan Sharma
            (276, 1080, 444, 1112) # Sunita Singh
        ]
        for b in boxes:
            apply_rounded_privacy_pill(im, b, radius=12, dot_count=8)
        out_path = os.path.join(MEDIA_DIR, "screen_collection_today.jpg")
        im.save(out_path, quality=95)
        print(" -> screen_collection_today.jpg saved.")

    # 3. Mohan Sharma Dues Screen
    p3 = os.path.join(MEDIA_DIR, "WhatsApp Image 2026-07-10 at 10.51.53 PM.jpeg")
    if os.path.exists(p3):
        im = Image.open(p3)
        # Header (9...
        apply_rounded_privacy_pill(im, (366, 67, 435, 93), radius=10, dot_count=4)
        out_path = os.path.join(MEDIA_DIR, "screen_mohan_dues.jpg")
        im.save(out_path, quality=95)
        print(" -> screen_mohan_dues.jpg saved.")

    # 4. Mohan Sharma Earlier Dates
    p4 = os.path.join(MEDIA_DIR, "WhatsApp Image 2026-07-10 at 10.52.02 PM.jpeg")
    if os.path.exists(p4):
        im = Image.open(p4)
        apply_rounded_privacy_pill(im, (366, 67, 435, 93), radius=10, dot_count=4)
        out_path = os.path.join(MEDIA_DIR, "screen_mohan_history.jpg")
        im.save(out_path, quality=95)
        print(" -> screen_mohan_history.jpg saved.")

    # 5. Raju Prasad Screen
    p5 = os.path.join(MEDIA_DIR, "WhatsApp Image 2026-07-10 at 10.56.10 PM.jpeg")
    if os.path.exists(p5):
        im = Image.open(p5)
        apply_rounded_privacy_pill(im, (330, 67, 445, 93), radius=10, dot_count=6)
        out_path = os.path.join(MEDIA_DIR, "screen_raju_detail.jpg")
        im.save(out_path, quality=95)
        print(" -> screen_raju_detail.jpg saved.")

    # 6. Customer Directory Screen
    p6 = os.path.join(MEDIA_DIR, "WhatsApp Image 2026-07-10 at 10.57.26 PM.jpeg")
    if os.path.exists(p6):
        im = Image.open(p6)
        out_path = os.path.join(MEDIA_DIR, "screen_customer_directory.jpg")
        im.save(out_path, quality=95)
        print(" -> screen_customer_directory.jpg saved.")

    # Clean up temporary test files
    for tmp in ["test_crop.png", "test_blurred_crop.png", "test_rounded.png", "test_dots.png"]:
        tmp_path = os.path.join(MEDIA_DIR, tmp)
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
    for i in range(10):
        r_path = os.path.join(MEDIA_DIR, f"row_{i}.png")
        if os.path.exists(r_path):
            os.remove(r_path)
    for f in os.listdir(MEDIA_DIR):
        if f.startswith("c1053_"):
            os.remove(os.path.join(MEDIA_DIR, f))

    print("All Privacy-Protected Screenshots Ready!")

if __name__ == "__main__":
    process_all()
