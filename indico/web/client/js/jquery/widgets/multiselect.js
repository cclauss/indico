// This file is part of Indico.
// Copyright (C) 2002 - 2019 CERN
//
// Indico is free software; you can redistribute it and/or
// modify it under the terms of the MIT License; see the
// LICENSE file for more details.

import 'jquery-ui-multiselect-widget';
import 'jquery-ui-multiselect-widget/src/jquery.multiselect.filter';
import 'jquery-ui-multiselect-widget/jquery.multiselect.css';
import 'jquery-ui-multiselect-widget/jquery.multiselect.filter.css';

var oldcreate = $.ech.multiselect.prototype._create;

$.extend($.ech.multiselect.prototype, {
    _create: function() {
        this.oldcreate = oldcreate;
        this.oldcreate(this);
        this._fixEventBindings();
    },

    _setMenuHeight: function() {
        // the new height calculation algorithm doesn't suit us
        this.menu.children(".ui-multiselect-checkboxes").height(this.options.height);
    },

    _fixEventBindings: function() {
        this.header.delegate('input[type="checkbox"], input[type="radio"]', 'click.multiselect', function(e) {
            e.stopPropagation();
        });

        this.menu.undelegate('label', 'mouseenter.multiselect');
    }
});

$.extend($.ech.multiselectfilter.prototype, {

    advancedFilter: function(searchText) {
        this.searchText = searchText || "";
        this._handler(this);
    },

    _checkOptions: function (label) {
        var searchValues = this.searchText.split(':');
        var fieldValues = label.split(':');

        for (var i = 0; i < searchValues.length; i++) {
            // Integer
            if (searchValues[i] && ((!isNaN(fieldValues[i]) && parseInt(searchValues[i]) > parseInt(fieldValues[i])) || fieldValues[i] == "None"))
                return false;
            // Bool
            if (searchValues[i].toLowerCase() == "true" && fieldValues[i].toLowerCase() == "false")
                return false;
        }
        return true;
    },

    updateCache: function(){
        // each list item
        this.rows = this.instance.menu.find(".ui-multiselect-checkboxes li:not(.ui-multiselect-optgroup-label)");

        // cache
        this.cache = this.element.children().map(function(){
            var self = $(this);

            // account for optgroups
            if( this.tagName.toLowerCase() === "optgroup" ){
                self = self.children();
            }

            return self.map(function(){
                return this.innerHTML.toLowerCase();
            }).get();
        }).get();

        this.cache2 = this.element.children().map(function(){
            var self = $(this);

            // account for optgroups
            if( this.tagName.toLowerCase() === "optgroup" ){
                self = self.children();
            }

            return self.map(function(){
                return $(this).attr('label');
            }).get();
        }).get();
    },

    _handler: function( e ){
        var rEscape = /[\-\[\]{}()*+?.,\\\^$|#\s]/g;
        var self = this;
        var term = $.trim( this.input[0].value.toLowerCase()),


        // speed up lookups
            rows = this.rows, inputs = this.inputs, cache = this.cache;

        if( !term && !this.searchText ){
            rows.show();
        } else {
            rows.hide();

            var regex = new RegExp(term.replace(rEscape, "\\$&"), 'gi');

            this._trigger( "filter", e, $.map(cache, function(v, i){
                if( v.search(regex) !== -1 && self._checkOptions(self.cache2[i]) ){
                    rows.eq(i).show();
                    return inputs.get(i);
                }

                return null;
            }));
        }

        // show/hide optgroups
        this.instance.menu.find(".ui-multiselect-optgroup-label").each(function(){
            var $this = $(this);
            var isVisible = $this.nextUntil('.ui-multiselect-optgroup-label').filter(function() {
                return $.css(this, "display") !== 'none';
            }).length;

            $this[ isVisible ? 'show' : 'hide' ]();
        });
    }
});
