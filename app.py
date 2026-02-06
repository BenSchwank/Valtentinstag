import streamlit as st
import streamlit.components.v1 as components
import os

# Konfigurieren der Seite
st.set_page_config(
    page_title="Willst du mein Valentine sein?",
    page_icon="💖",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Funktion zum Laden der Dateien
def load_file(filename):
    with open(filename, "r", encoding="utf-8") as f:
        return f.read()

# Verstecken der Streamlit-Elemente für einen cleanen Look
hide_streamlit_style = """
<style>
#MainMenu {visibility: hidden;}
footer {visibility: hidden;}
div.block-container {padding-top: 0rem; padding-bottom: 0rem; padding-left: 0rem; padding-right: 0rem;}
</style>
"""
st.markdown(hide_streamlit_style, unsafe_allow_html=True)

# Laden der Inhalte
try:
    # Wir lesen die Dateien ein und bauen sie zusammen
    # Dies ist notwendig, damit Streamlit Cloud Pfade richtig auflöst
    css_content = load_file("style.css")
    js_content = load_file("script.js")
    
    # Laden der HTML Struktur (wir entfernen script/style tags, da wir sie explizit einfügen)
    html_raw = load_file("index.html")
    
    # Quick & Dirty Parsing, um die externen Links zu entfernen, da wir sie inlinen
    # (Wir nehmen an, wir ersetzen einfach den ganzen Head/Body Inhalt oder injecten es passend)
    # Ein einfacherer Weg: Wir bauen das HTML hier neu zusammen mit den Inhalten
    
    full_html = f"""
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Willst du mein Valentine sein?</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&family=Pacifico&display=swap" rel="stylesheet">
        <style>
            {css_content}
        </style>
    </head>
    <body style="margin: 0; padding: 0;">
        <div class="container">
            <div id="content">
                <img id="main-image" src="https://media.tenor.com/K2QK1D7rM6sAAAAi/bear-kiss-bear-kisses.gif" alt="Cute bear">
                <h1 class="question">Willst du mein Valentine sein? 💖</h1>
                
                <div class="buttons">
                    <button id="yes-btn" class="btn yes-btn">Ja</button>
                    <button id="no-btn" class="btn no-btn">Nein</button>
                </div>
            </div>
        </div>
        <script>
            {js_content}
        </script>
    </body>
    </html>
    """

    # Anzeigen der HTML Komponente
    # Höhe 1000px reicht meistens, scrolling="no" verhindert Scrollbars
    components.html(full_html, height=1000, scrolling=True)

except FileNotFoundError as e:
    st.error(f"Fehler: Datei nicht gefunden: {e}")
    st.info("Stelle sicher, dass index.html, style.css und script.js im gleichen Ordner liegen.")

