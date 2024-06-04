# 2024 MDDN342 Assignment 3: Data Mappings

## Modifying the Assignment 2 Faces

The faces I made for assignment 3 were very minimalist and cartoony, so implementing them into this project was challenging. When their features were mapped onto a human face they looked odd and creepy. To preserve the style of the faces, I decided not to accurately map the eyes, as I believe them to be the core of the original design, along with the circular head. However I did create a new mouth using curve shapes accurately mapping to the points on the lips. I was impressed by how well these points on the face were tracked, allowing for smooth and dynamic expressions. 

## Training the AI

### Variables

- Eye Openness
    - Changes how open the eyes are by moving the eyelids.
    - Based on how open the subjects eyes are (squinting, closed, wide eyed)
- Lip Contrast
    - Changes the brightness of the lips.
    - Based on the contrast of the subjects lips to their skin.
- Age
    - Changes how saturated the hair is (less saturated when older).
    - Also adds wrinkles if the value is over 33 (one third of the range), the older the subject the darker the wrinkles.
    - Based on the perceived age of the subject.
- Gender
    - Adds blush if the subject is female.
    - Based on the perceived gender of the subject, decisions based on traditionally feminine appearance (no facial hair, makeup, longer hair).
- Smiling
    - Changes the glint in the eye to have a more twinkly cross shape rather than a circle.
    - Based on whether the subject is smiling.
- Has Hair
    - Determines whether hair is drawn.
    - Based on if the subject has hair.
- Hair Darkness
    - Determines the brightness of the hair colour.
    - Based on the darkness of the subject's hair.
- Long Hair
    - Determines whether an extra shape is drawn to extend the hair.
    - Based on whether the subject has long hair (not a continuous variable)
- Hair Redness
    - Determines where the hue of the hair colour sits between yellow and red.
    - Based on how red the subject's hair is.
