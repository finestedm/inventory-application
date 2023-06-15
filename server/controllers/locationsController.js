// IMPORT MODELS
import Location from '../models/location.js'
import { body, validationResult, check } from 'express-validator';
import validator from 'validator';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(customParseFormat);

export async function location_list(req, res) {
    try {
        const location_list = await Location.find();
        res.status(200).json(location_list)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export async function location_details(req, res) {
    try {
        const location = await Location.findOne({ _id: req.params.id });
        Object.entries(location.openingHours).forEach(([day, openingHours]) => {
            if (openingHours.open) {
                const timeObject = dayjs().set('hour', dayjs(openingHours.open, 'H:mm').hour()).set('minute', dayjs(openingHours.open, 'H:mm').minute());
                openingHours.open = dayjs(timeObject).format('HH:mm');
            }
            if (openingHours.close) {
                const timeObject = dayjs().set('hour', dayjs(openingHours.close, 'H:mm').hour()).set('minute', dayjs(openingHours.close, 'H:mm').minute());
                openingHours.close = dayjs(timeObject).format('HH:mm');
            }
            delete openingHours._id; // Exclude the _id field
        }
        )
        res.status(200).json(location)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export async function create_new_location(req, res) {
    const { city, street, country, zip, phoneNumber, email } = req.body
    await check('city')
        .notEmpty()
        .withMessage('Name is required')
        .custom(value => {
            if (value.length < 2 && value.length > 0) {
                throw new Error('Minimum city name length is 2 letters');
            } else if (value.length > 30) {
                throw new Error('Maximum letters in city name is 30');
            } else {
                return true;
            }
        })
        .run(req)

    // city sanitization
    const sanitizedCity = validator.trim(validator.escape(city.toString()))

    await check('street')
        .notEmpty()
        .withMessage('street is required')
        .custom(value => {
            if (value.length < 2 && value.length > 0) {
                throw new Error('provide at least 2 letters');
            } else if (value.length > 50) {
                throw new Error('Maximum letters in street is 50');
            } else if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]+\d+\/?\d*$/.test(value)) {
                throw new Error('Provide both street name and building number')
            } else {
                return true;
            }
        })
        .run(req)

    // street sanitization
    const sanitizedStreet = validator.trim(validator.escape(street.toString()))

    await check('country')
        .notEmpty()
        .withMessage('country is required')
        .custom(value => {
            if (value.length < 2 && value.length > 0) {
                throw new Error('Minimum country name length is 2 letters');
            } else if (value.length > 30) {
                throw new Error('Maximum letters in country name is 30');
            } else {
                return true;
            }
        })
        .run(req)

    // country sanitization
    const sanitizedCountry = validator.trim(validator.escape(country.toString()))

    await check('zip')
        .notEmpty()
        .withMessage('zip is required')
        .custom(value => {
            if (!/^\d{5}$/.test(value)) {
                throw new Error('Correct format is 5 digits');
            } else {
                return true;
            }
        })
        .run(req)

    // zip sanitization
    const sanitizedZip = validator.trim(validator.escape(zip))

    await check('phoneNumber')
        .custom(value => {
            if (!/^\+[1-9]{1}[0-9]{3,14}$/.test(value)) {
                throw new Error('This is not a valid phone number');
            } else {
                return true;
            }
        })
        .run(req)

    // phoneNumber sanitization
    const sanitizedPhoneNumber = validator.trim(validator.escape(phoneNumber))

    await check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isLength({ max: 40 })
        .withMessage('email cannot be longer than 40 characters')
        .custom(value => {
            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
                throw new Error('This is not a valid email address');
            } else {
                return true;
            }
        })
        .run(req)

    // email sanitization
    const sanitizedEmail = validator.trim(validator.escape(email))

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const newLocation = new Location({
        city: sanitizedCity,
        street: sanitizedStreet,
        country: sanitizedCountry,
        zip: sanitizedZip,
        phoneNumber: sanitizedPhoneNumber,
        email: sanitizedEmail
    });

    try {
        const createdLocation = await newLocation.save()
        res.status(201).json(createdLocation)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

export async function edit_location(req, res) {
    const { _id, city, street, country, zip, phoneNumber, email } = req.body

    await check('city')
        .notEmpty()
        .withMessage('Name is required')
        .custom(value => {
            if (value.length < 2 && value.length > 0) {
                throw new Error('Minimum city name length is 2 letters');
            } else if (value.length > 30) {
                throw new Error('Maximum letters in city name is 30');
            } else {
                return true;
            }
        })
        .run(req)

    // city sanitization
    const sanitizedCity = validator.trim(validator.escape(city.toString()))

    await check('street')
        .notEmpty()
        .withMessage('street is required')
        .custom(value => {
            if (value.length < 2 && value.length > 0) {
                throw new Error('provide at least 2 letters');
            } else if (value.length > 50) {
                throw new Error('Maximum letters in street is 50');
            } else if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]+\d+\/?\d*$/.test(value)) {
                throw new Error('Provide both street name and building number')
            } else {
                return true;
            }
        })
        .run(req)

    // street sanitization
    const sanitizedStreet = validator.trim(validator.escape(street.toString()))

    await check('country')
        .notEmpty()
        .withMessage('country is required')
        .custom(value => {
            if (value.length < 2 && value.length > 0) {
                throw new Error('Minimum country name length is 2 letters');
            } else if (value.length > 30) {
                throw new Error('Maximum letters in country name is 30');
            } else {
                return true;
            }
        })
        .run(req)

    // country sanitization
    const sanitizedCountry = validator.trim(validator.escape(country))

    await check('zip')
        .notEmpty()
        .withMessage('zip is required')
        .custom(value => {
            if (!/^\d{5}$/.test(value)) {
                throw new Error('Correct format is 5 digits');
            } else {
                return true;
            }
        })
        .run(req)

    // zip sanitization
    const sanitizedZip = validator.trim(validator.escape(zip.toString()))

    await check('phoneNumber')
        .custom(value => {
            if (!/^\+[1-9]{1}[0-9]{3,14}$/.test(value)) {
                throw new Error('This is not a valid phone number');
            } else {
                return true;
            }
        })
        .run(req)

    // phoneNumber sanitization
    const sanitizedPhoneNumber = validator.trim(validator.escape(phoneNumber))

    await check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isLength({ max: 40 })
        .withMessage('email cannot be longer than 40 characters')
        .custom(value => {
            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
                throw new Error('This is not a valid email address');
            } else {
                return true;
            }
        })
        .run(req)

    // email sanitization
    const sanitizedEmail = validator.trim(validator.escape(email))

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const newData = {
        city: sanitizedCity,
        street: sanitizedStreet,
        country: sanitizedCountry,
        zip: sanitizedZip,
        phoneNumber: sanitizedPhoneNumber,
        email: sanitizedEmail
    };

    try {
        const updatedLocation = await Location.findOneAndUpdate({ _id }, newData, { new: true })
        res.status(201).json(updatedLocation)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

export async function edit_location_hours(req, res) {
    const { _id, openingHours } = req.body;
    console.log(openingHours);
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const isValidData = daysOfWeek.every(day => {
        const openingHour = openingHours[day];

        // Check if the opening hour is a valid date string
        const isOpeningValid = openingHour.open === null || (!isNaN(Date.parse(openingHour.open)));
        // Check if the closing hour is a valid date string
        const isClosingValid = openingHour.close === null || (!isNaN(Date.parse(openingHour.close)));

        return isOpeningValid && isClosingValid;
    });

    if (!isValidData) {
        return res.status(422).json({ error: 'Opening hours data is not valid' });
    }

    try {
        const updatedLocation = await Location.findOneAndUpdate({ _id }, { openingHours }, { new: true });
        res.status(201).json(updatedLocation);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



export async function delete_location(req, res) {

    try {
        const deletedLocation = await Location.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedLocation)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}