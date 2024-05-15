from langdetect import detect
import sys

# Dummy functions for parsing resumes based on language
def parse_english_resume(text):
    print("Parsing resume in English...")
    # Your existing parsing logic for English resumes
    pass

def parse_french_resume(text):
    print("Parsing resume in French...")
    # Your existing parsing logic for French resumes
    pass

def detect_and_parse_resume(text):
    try:
        # Detect the language of the resume
        language = detect(text)
        print(f"Detected language: {language}")

        # Conditionally parse the resume based on detected language
        if language == 'en':
            parse_english_resume(text)
        elif language == 'fr':
            parse_french_resume(text)
        else:
            print(f"No specific parser available for the detected language ({language}).")

    except Exception as e:
        print(f"Error processing the resume: {e}")

if __name__ == "__main__":
    # Example usage:
    # Read resume text from a file or input directly
    if len(sys.argv) > 1:
        with open(sys.argv[1], 'r', encoding='utf-8') as file:
            resume_text = file.read()
    else:
        resume_text = input("Paste the resume text here: ")

    detect_and_parse_resume(resume_text)
