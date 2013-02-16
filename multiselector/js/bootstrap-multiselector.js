/* Copyright 2013 Tomasz 'Doppler' Najdek
* Licensed under MIT license
* For more info, source code and license visit:
* https://github.com/tnajdek/bootstrap-multiselector
*/
 
(function ($) {
	"use strict";

	var MultiSelector = function (element, options) {
		var $element = this.$element = $(element);
		this.options = $.extend({}, $.fn.multiselector.defaults, options);
		this.$element.find('ul a').click(function (e) {
			var checkbox = $(this).find('input[type=checkbox]').first();
			if (checkbox.length) {
				e.stopPropagation();
				e.preventDefault();
				checkbox.prop('checked', !checkbox[0].checked);
			} else {
				$element.find('input[type=checkbox]').prop('checked', false);
			}
			$element.multiselector('update');
		});
	};

	MultiSelector.prototype = {
		constructor: MultiSelector,

		update: function () {
			var $el = this.$element,
				selected = $el.find('input[type=checkbox]:checked'),
				defaultValue = $el.find('ul>li:first-child>a').text(),
				$label = $($el.find('a > span:first-child')),
				multipleText = $el.data('multipleText') || this.options.multipleText,
				visibleItems = $el.data('visibleItems') || this.options.visibleItems,
				separator = $el.data('separator') || this.options.separator;
			if (selected.length === 0) {
				$label.text(defaultValue);
			} else if (selected.length === 1) {
				$label.text($(selected[0]).parent().text());
			} else if (selected.length <= visibleItems) {
				$label.text(selected.map(function () {
					return $(this).parent().text();
				}).get().join(separator));
			} else {
				$label.text(multipleText);
			}
		}
	};

  /* MULTISELECTOR PLUGIN DEFINITION
   * =========================== */

	$.fn.multiselector = function (option) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('multiselector'),
				options = typeof option === 'object' && option;
			if (!data) {
				$this.data('multiselector', (data = new MultiSelector(this, options)));
			}
			if (option === 'update') {
				data.update();
			}
		});
	};

	$.fn.multiselector.defaults = {
		multipleText: 'Multiple Items',
		visibleItems: 2,
		separator: ', '
	};

	$.fn.multiselector.Constructor = MultiSelector;

	$(function () {
		$('body').on('focus.multiselector.data-api', '[data-provide="multiselector"]', function (e) {
			var $selector = $(e.target);
			if (!$selector.hasClass('multi-selector')) {
				$selector = $selector.closest('.multi-selector');
			}
			$selector.multiselector('update');
		});
		$('.multi-selector').multiselector('update');

	});

}(window.jQuery));