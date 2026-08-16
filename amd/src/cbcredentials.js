// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Copies Cloud Poodll API credentials found elsewhere on the site into the credentials fields.
 *
 * The fields live on the admin settings page in one case and on the in page credentials panel in
 * the other, so the button carries the selectors and the values as data attributes.
 *
 * @module     filter_poodll/cbcredentials
 * @copyright  2026 Justin Hunt (poodllsupport@gmail.com)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Fill a field, if we can find it.
 *
 * @param {String} selector
 * @param {String} value
 */
const fillfield = (selector, value) => {
    if (!selector) {
        return;
    }
    const field = document.querySelector(selector);
    if (!field) {
        return;
    }
    field.value = value;
    field.dispatchEvent(new Event('change', {bubbles: true}));
};

export const init = () => {
    const buttons = document.querySelectorAll('[data-action="cbpokecreds"]');
    buttons.forEach((button) => {
        if (button.dataset.cbinitialised) {
            return;
        }
        button.dataset.cbinitialised = 1;
        button.addEventListener('click', (e) => {
            e.preventDefault();
            fillfield(button.dataset.apiuserselector, button.dataset.apiuser);
            fillfield(button.dataset.apisecretselector, button.dataset.apisecret);
        });
    });
};
