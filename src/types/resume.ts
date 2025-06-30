// Personal Info structure
// @typedef {{
/**
 * @typedef {Object} PersonalInfo
 * @property {string} fullName
 * @property {string} title
 * @property {string} email
 * @property {string} phone
 * @property {string} location
 * @property {string} [linkedin]
 * @property {string} [website]
 * @property {string} summary
 */

// @typedef {Object} Experience
/**
 * @property {string} id
 * @property {string} title
 * @property {string} company
 * @property {string} location
 * @property {string} startDate
 * @property {string} endDate
 * @property {boolean} current
 * @property {string} description
 */

// @typedef {Object} Education
/**
 * @property {string} id
 * @property {string} institution
 * @property {string} degree
 * @property {string} field
 * @property {string} startDate
 * @property {string} endDate
 * @property {string} location
 * @property {string} [gpa]
 */

// @typedef {Object} Skill
/**
 * @property {string} id
 * @property {string} name
 */

// @typedef {Object} Project
/**
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} [url]
 * @property {string} startDate
 * @property {string} endDate
 * @property {boolean} current
 */

// @typedef {Object} ResumeData
/**
 * @property {PersonalInfo} personalInfo
 * @property {Experience[]} experiences
 * @property {Education[]} education
 * @property {Skill[]} skills
 * @property {Project[]} projects
 */
