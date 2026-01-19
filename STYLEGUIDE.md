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

### Accent Colors

## Typography
- The main body font will be [Poppins](https://fonts.google.com/specimen/Poppins)
- Heading font will be [Oxygen](https://fonts.google.com/specimen/Oxygen)
- Links will use [Montserrat](https://fonts.google.com/specimen/Montserrat) as their font

The system fallback font will be used as shown:
```
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
```

### Font Sizes
- Body(main) will be set to 1rem
- Headings
<!-- - Line height, letter spacing, text deco
- Font weight(s) -->

## Page Layout
- Root level will have default margins and padding removed
- Margins will be manually set to (x) rem
- Padding will be manually set to (x) rem


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


<!-- 
A central stylesheet and style guide will help to unify the appearance of the application.
STYLEGUIDE.MD file is added to the application root. It describes:
The colour palette of the application (three to five colours, their names and hex values) that should be used throughout the application.
The font(s) to be used throughout the application and their respective sizes (three at minimum).
 -->