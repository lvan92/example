const { body, check } = require('express-validator');

const validateCreateEvent = [
    check('event_name').isString().not().isEmpty().withMessage('Event name not null!'),
    check('event_description').isString().optional({ nullable: true }),
    check('event_address').isString().not().isEmpty().withMessage('Event address not null!'),
    check('event_sport_group_id').isInt().optional({ nullable: true }),
    check('tribe_id').isInt().not().isEmpty().withMessage('Event tribe id not null!'),
    check('opponent_tribe_id').isInt().optional({ nullable: true }),
    check('event_start_time').not().isEmpty().withMessage('Event start time not null!'),
    check('event_end_time').not().isEmpty().withMessage('Event end time not null!'),
    check('event_type').isInt().not().isEmpty().withMessage('Event type not null!'),
    check('event_repeat').not().isEmpty().withMessage('Event repeat not null!'),
    check('event_image_url').isString().not().isEmpty().withMessage('Event image url not null!'),
    check('ismultiday').not().isEmpty().withMessage('Event multiday not null!'),
]

const validateCreateImpact = [
    check('impact_name').isString().not().isEmpty().withMessage('Impact Name must be string and not null'),
    check('impact_description').isString().not().isEmpty().withMessage('Impact Description must be string and not null'),
    check('impact_achieve').isString().not().isEmpty().withMessage('Impact Achieve must be string and not null'),
    check('impact_type').isInt().not().isEmpty().withMessage('Impact Type must be integer and not null'),
    check('country_id').isInt().not().isEmpty().withMessage('Country ID must be integer and not null'),
    check('impact_image_url').isString().not().isEmpty().isString().withMessage('Impact Image URL must be string and not null'),
    check('language_id').isInt().not().isEmpty().withMessage('Language ID must be integer and not null'),
    check('category_id').isInt().not().isEmpty().withMessage('Category ID must be integer and not null')
]

const validateUpdateImpact = [
    check('impact_name').isString().optional().notEmpty().withMessage('Impact Name must be string and not null'),
    check('impact_description').isString().optional().notEmpty().withMessage('Impact Description must be string and not null'),
    check('impact_achieve').isString().optional().notEmpty().withMessage('Impact Achieve must be string and not null'),
    check('impact_type').isInt().optional().notEmpty().withMessage('Impact Type must be integer and not null'),
    check('country_id').isInt().optional().notEmpty().withMessage('Country ID must be integer and not null'),
    check('impact_image_url').isString().notEmpty().optional().isString().withMessage('Impact Image URL must be string and not null'),
    check('language_id').isInt().optional().notEmpty().withMessage('Language ID must be integer and not null'),
    check('category_id').isInt().optional().notEmpty().withMessage('Category ID must be integer and not null')
]

const validateCreateSession = [
    body('*.sponsor_id').isInt().optional({ nullable: true }).withMessage('Sponsor ID must be integer'),
    body('*.sound_id').isInt().withMessage('Sound ID is required and must be integer'),
    body('*.event_id').isInt().withMessage('Event ID is required and must be integer'),
    body('*.session_start_time').isISO8601().withMessage('Session Start Time is required and must follow ISO8601 standard'),
    body('*.session_duration').isInt().withMessage('Session Duration is required and must be integer'),
    body('*.session_max_donation_total').isFloat({ min: 0 }).optional({ nullable: true }).withMessage('Max Donation Total must be number type ( float )'),
    body('*.session_max_donation_per_user').isFloat({ min: 0 }).optional({ nullable: true }).withMessage('Max Donation Per User must be number type ( float )'),
    body('*.session_show_logo').isBoolean().optional({ nullable: true }).withMessage('Session Show Logo must be boolean'),
    body('*.session_ads_start').isBoolean().optional({ nullable: true }).withMessage('Session Ads Start must be boolean'),
    body('*.session_ads_end').isBoolean().optional({ nullable: true }).withMessage('Session Ads End must be boolean'),
    body('*.session_content.language_id').isInt().withMessage('Session Language ID is required and must be integer'),
    body('*.session_content.session_name').isString().notEmpty().withMessage('Session Name is required and must be string'),
    body('*.session_content.session_motivation_text').isString().optional({ nullable: true }).notEmpty().withMessage('Session Motivation Text must be string and not Empty'),
    body('*.session_keyword.*.session_keyword_start_time').isInt().withMessage('Session Keyword Start Time must be integer and not Empty'),
    body('*.session_keyword.*.session_keyword_content.language_id').isInt().withMessage('Session Keyword Language ID must be integer and not Empty'),
    body('*.session_keyword.*.session_keyword_content.session_keyword_name').isString().notEmpty().withMessage('Session Keyword Name must be string and not Empty')
]

module.exports = {
    validateCreateEvent,
    validateCreateImpact,
    validateUpdateImpact,
    validateCreateSession
}