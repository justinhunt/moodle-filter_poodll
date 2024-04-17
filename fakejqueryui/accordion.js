/**
 * Replica of jQuery UI accordion function for Moodle
 *
 * @author Alex Morris <alex.morris@catalyst.net.nz>
 * @copyright 2022 Catalyst IT
 */
define(['jquery'],
    function($) {
        $.fn.extend({
            uniqueId: (function() {
                var uuid = 0;

                return function() {
                    return this.each(function() {
                        if (!this.id) {
                            this.id = "ui-id-" + (++uuid);
                        }
                    });
                };
            })(),

            removeUniqueId: function() {
                return this.each(function() {
                    if (/^ui-id-\d+$/.test(this.id)) {
                        $(this).removeAttr("id");
                    }
                });
            }
        });

        /**
         * Add accordion function to jQuery. Initial header and panel setup.
         */
        $.fn.accordion = function(opts) {
            var headers = null;
            var panels = null;
            var active = null;
            var activeIndex = 0;
            var prevShow = null;
            var prevHide = null;
            var hideProps = {
                borderTopWidth: "hide",
                borderBottomWidth: "hide",
                paddingTop: "hide",
                paddingBottom: "hide",
                height: "hide"
            };
            var showProps = {
                borderTopWidth: "show",
                borderBottomWidth: "show",
                paddingTop: "show",
                paddingBottom: "show",
                height: "show"
            };

            /**
             * Find tab headers
             *
             * @param elem
             * @returns {*}
             */
            var findHeaders = function(elem) {
                return elem.find("> h3");
            };

            /**
             * Get active header by index
             *
             * @param index
             * @returns {*|jQuery|HTMLElement}
             */
            var findActive = function(index) {
                return typeof index === "number" ? headers.eq(index) : $();
            };

            /**
             * Add icon next to header
             */
            var createIcons = function() {
                var icon = $("<span>");
                icon.addClass(['ui-accordion-header-icon', 'ui-icon', 'ui-icon-triangle-1-e']);
                icon.prependTo(headers);
                var children = active.children(".ui-accordion-header-icon");
                children.removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-s');
                headers.addClass('ui-accordion-icons');
            };

            /**
             * Animate opening and closing of the panels.
             *
             * @param toShow
             * @param toHide
             * @param data
             * @returns {*}
             */
            var animate = function(toShow, toHide, data) {
                var complete = function() {
                    var toHide = data.oldPanel;
                    var prev = toHide.prev();

                    toHide.removeClass('ui-accordion-content-active');
                    prev.removeClass('ui-accordion-header-active');
                    prev.addClass('ui-accordion-header-collapsed');

                    activate(data);
                };

                if (!toHide.length) {
                    return toShow.animate(showProps, {complete: complete});
                }
                if (!toShow.length) {
                    return toHide.animate(hideProps, {complete: complete});
                }

                toHide.animate(hideProps, {
                    step: function(now, fx) {
                        fx.now = Math.round(now);
                    }
                });
                var adjust = 0;
                var boxSizing = toShow.css('box-sizing');
                toShow.hide().animate(showProps, {
                    complete: complete,
                    step: function(now, fx) {
                        fx.now = Math.round(now);
                        if (fx.prop !== "height") {
                            if (boxSizing === "content-box") {
                                adjust += fx.now;
                            }
                        }
                    }
                });
            };

            /**
             * Confirm header is active.
             *
             * @param index
             */
            var activate = function(index) {
                var toActive = findActive(index)[0];

                if (toActive === active[0]) {
                    return;
                }

                toActive = toActive || active[0];

                eventHandler({
                    target: toActive,
                    currentTarget: toActive,
                    preventDefault: $.noop
                });
            };

            /**
             * Toggle header & panel
             *
             * @param data
             */
            var toggle = function(data) {
                var toShow = data.newPanel;
                var toHide = prevShow.length ? prevShow : data.oldPanel;
                prevShow.add(prevHide).stop(true, true);
                prevShow = toShow;
                prevHide = toHide;

                animate(toShow, toHide, data);

                toHide.attr("aria-hidden", "true");
                toHide.prev().attr({
                    "aria-selected": "false",
                    "aria-expanded": "false"
                });

                if (toShow.length && toHide.length) {
                    toHide.prev().attr({
                        "tabIndex": -1,
                        "aria-expanded": "false"
                    });
                } else if (toShow.length) {
                    headers.filter(function() {
                        return parseInt($(this).attr("tabIndex"), 10) === 0;
                    }).attr("tabIndex", -1);
                }

                toShow.attr("aria-hidden", "false")
                    .prev()
                    .attr({
                        "aria-selected": "true",
                        "aria-expanded": "true",
                        tabIndex: 0
                    });
            };

            /**
             * Toggle event called
             *
             * @param event
             */
            var eventHandler = function(event) {
                var clicked = $(event.currentTarget);
                var clickedIsActive = clicked[0] === active[0];
                var toShowElement = clickedIsActive ? $() : clicked.next();
                var oldActive = active;

                var data = {
                    newHeader: clickedIsActive ? $() : clicked,
                    newPanel: toShowElement,
                };

                //if we have an old active header, prepare to toggle it closed
                if(oldActive.length>0){
                    data.oldHeader = oldActive;
                    data.oldPanel = oldActive.next();
                }else{
                    //this just means toggles will silently fail (but not throw an error) if there is no active header
                    data.oldHeader = oldActive;
                    data.oldPanel = oldActive
                }

                event.preventDefault();

                // Clicked on active header.
                if (clickedIsActive) {
                    return;
                }

                activeIndex = clickedIsActive ? false : headers.index(clicked);
                active = clickedIsActive ? $() : clicked;

                toggle(data);

                // Switch CSS classes.
                //De activate old active header
                if(oldActive.length>0) {
                    oldActive.removeClass(['ui-accordion-header-active', 'ui-state-active']);
                    oldActive.children('.ui-accordion-header-icon').removeClass('ui-icon-triangle-1-s').addClass('ui-icon-triangle-1-e');
                }
                if (!clickedIsActive) {
                    clicked.removeClass('ui-accordion-header-collapsed').addClass(['ui-accordion-header-active', 'ui-state-active']);
                    clicked.children('.ui-accordion-header-icon').removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-s');
                    clicked.next().addClass('ui-accordion-content-active');
                }
            };

            /**
             * Setup event listeners
             */
            var setupEvents = function() {
                headers.on("click", eventHandler);
                // TODO: Setup event listeners for arrows and enter keys.
            };

            /**
             * Set up headers and panels.
             */
            var refresh = function() {
                // Find active header, show content.
                active = findActive(activeIndex);
                if(active.length > 0) {
                    active.addClass(['ui-accordion-header-active', 'ui-state-active']);
                    active.removeClass('ui-accordion-header-collapsed');
                    active.next().addClass('ui-accordion-content-active');
                    active.next().show();
                }

                headers.attr("role", "tab")
                    .each(function() {
                        var header = $(this);
                        var headerId = header.uniqueId().attr("id");
                        var panel = header.next();
                        var panelId = panel.uniqueId().attr("id");
                        header.attr("aria-controls", panelId);
                        panel.attr("aria-labelledby", headerId);
                    })
                    .next()
                    .attr("role", "tabpanel");

                headers.not(active)
                    .attr({
                        "aria-selected": "false",
                        "aria-expanded": "false",
                        tabIndex: -1
                    })
                    .next()
                    .attr("aria-hidden", "true")
                    .hide();

                if (!active.length) {
                    headers.eq(0).attr("tabIndex", 0);
                } else {
                    active.attr({
                        "aria-selected": "true",
                        "aria-expanded": "true",
                        tabIndex: 0
                    })
                        .next()
                        .attr("aria-hidden", "false");
                }

                createIcons();

                setupEvents();
            };

            // Initialise accordion.
            prevShow = prevHide = $();
            this.addClass(['ui-accordion', 'ui-widget', 'ui-helper-reset']);
            this.attr("role", "tablist");

            headers = findHeaders(this);

            headers.each(function(i, elem) {
                $(elem).addClass(['ui-accordion-header', 'ui-accordion-header-collapsed', 'ui-state-default']);
            });

            panels = headers.next().filter(":not(.ui-accordion-content-active)").hide();
            panels.each(function(i, elem) {
                $(elem).addClass(['ui-accordion-content', 'ui-helper-reset', 'ui-widget-content']);
            });

            //set the active index
            if($.isNumeric(opts.active)) {
                activeIndex =  parseInt(opts.active);
            }else{
                activeIndex = 99999;//this is just a random number to indicate no active index
            }
            refresh();
        };
    }
);