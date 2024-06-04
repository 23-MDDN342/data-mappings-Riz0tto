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

### Successfulness of the Training

Though the variables I set for the training allowed me get through the training quiz with minimal incorrect answers, the AI didn't seem to connect all the variables to the traits I intended it to. It seems to be very good at distinguishing gender and alright at determining age, however it is inconsistent with the rest. For example it often thinks the subject is smiling when they aren't. 

One cause could be that some of the values are connected indirectly, such as gender and hair length (female subjects are more likely to have long hair), or age and gender (subjects wearing makeup may look younger).

Another possibility is that the training images lack broad enough samples within specific traits. One thing I noticed was that because the images are largely portrait photos taken with the flash on, the subjects are often slightly squinting making the 'eye openness' variable operate within a small range. There are also more older men than older women, which could be why the AI seems to assume men are older. This is also true of men with long hair, there are only three in the training images so the long hair is seen as an outlier.

### Sample Images

For my sample images I chose British sitcoms, as my faces are fairly absurd and comedic, and images of the casts of these shows each have a few people to create faces for. These are not the most diverse groups but there are a range of ages, hair styles and expressions.

