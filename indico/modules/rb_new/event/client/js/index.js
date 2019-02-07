/* This file is part of Indico.
 * Copyright (C) 2002 - 2019 European Organization for Nuclear Research (CERN).
 *
 * Indico is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 3 of the
 * License, or (at your option) any later version.
 *
 * Indico is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Indico; if not, see <http://www.gnu.org/licenses/>.
 */

import rbURL from 'indico-url:rooms_new.roombooking';

import {serializeDate, serializeTime} from 'indico/utils/date';


$(document).ready(() => {
    $('#contribution, #session_block').on('change', (e) => {
        let params = {};
        const $target = $(e.currentTarget);
        const $bookBtn = $target.closest('.searchable-field').find('.js-book-btn');
        const linkType = {
            contribution: 'contribution',
            session_block: 'sessionBlock',
        }[$target.attr('id')];
        if ($target.val()) {
            const values = JSON.parse($target.val());
            params = {
                link_type: linkType,
                link_id: values.id,
                recurrence: 'single',
                number: 1,
                interval: 'week',
                sd: serializeDate(values.start_dt),
                st: serializeTime(values.start_dt),
                et: serializeTime(values.end_dt),
            };
        }
        $bookBtn
            .toggleClass('disabled', !$target.val())
            .attr('href', rbURL({path: 'book', ...params}));
    });
});
