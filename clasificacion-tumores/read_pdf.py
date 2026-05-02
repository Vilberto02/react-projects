import sys
import pypdf

def extract_text_from_pdf(pdf_path, out_path):
    reader = pypdf.PdfReader(pdf_path)
    text = ''
    for page in reader.pages:
        text += page.extract_text() + '\n'
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(text)

if __name__ == "__main__":
    pdf_path = sys.argv[1]
    out_path = sys.argv[2]
    extract_text_from_pdf(pdf_path, out_path)
