# Styling Guideline for Pokemon ROM Hack Collection

## Color Palette
### Main Colors
<div style="display: flex; gap: 10px;">
  <div style="background-color: #fafaf9; color: #000000; padding: 20px; text-align: center;">
    Stone 50<br>#FAFAF9
  </div>
  <div style="background-color: #475569; color: #FFFFFF; padding: 20px; text-align: center;">
    Slate 600<br>#475569
  </div>
  <div style="background-color: #030712; color: #FFFFFF; padding: 20px; text-align: center;">
    Gray 950<br>#030712
  </div>
  <div style="background-color: #1e3a8a; color: #FFFFFF; padding: 20px; text-align: center;">
    Blue 900<br>#1E3A8A
  </div>
</div>

<!-- ### Accent Colors -->

## Typography
- The main body font will be [Poppins](https://fonts.google.com/specimen/Poppins)
- Heading font will be [Oxygen](https://fonts.google.com/specimen/Oxygen)
- Links will use [Montserrat](https://fonts.google.com/specimen/Montserrat) as their font

The system fallback font will be used as shown:
```
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
```

### Font Sizes
- Body (main) will be set to 1rem
- Heading 1 will be set to 2em
- Heading 2 will be set to 1.5em
- Heading 3 will be set to 1.125em

### Font Weights
Poppins
- Regular 400
- Bold 700

Oxygen
- Bold 700

Montserrat
- Light 300

<!-- TODO: Line height, letter spacing, text deco, font weight(s) -->

## Page Layout
- Root level will have default margins and padding removed
<!-- - Margins will be manually set to (x) rem
- Padding will be manually set to (x) rem -->


## Media Query (Responsive Design)
```
@media (min-width: 481px) and (max-width: 768px) { 
  /* mobile */ 
}
```

```
@media (min-width: 769px) and (max-width: 1024px) { 
  /* tablet */ 
}
```

```
@media (min-width: 1025px) and (max-width: 1200px) { 
  /* desktop */ 
}
```