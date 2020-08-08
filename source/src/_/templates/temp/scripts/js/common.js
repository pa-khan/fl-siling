$(document).ready(function() {
	
	$('.input.--phone .input__area').mask('+7 (000) 000-00-00');
	var hello = {
		list: $('.hello__list')
	}

	hello.list.slick({
		fade: true,
		dots: true,
		adaptiveHeight: true
	})


	var gallery = {
		list: $('.gallery__list'),
		dots: $('.gallery__counts')
	}

	gallery.list.slick({
		slidesToShow: 4,
		slidesToScroll: 4,
		// variableWidth: true,
		// centerMode: true,
		dots: true,
		appendDots: gallery.dots,
		responsive: [
		{
			breakpoint: 1410,
			settings: 
			{
				slidesToShow: 3,
				slidesToScroll: 3,
			}
		},
		{
			breakpoint: 992,
			settings: 
			{
				slidesToShow: 2,
				slidesToScroll: 2,
			}
		},
		{
			breakpoint: 767,
			settings: 
			{
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		}
		]
	})

	var ranges = {
		cls: {
			wrap: '.range__wrap'
		},
		attr: {
			min    : 'data-min',
			max    : 'data-max',
			current: 'data-current',
			prefix : 'data-prefix'
		},
		list: {
			square: $('#range-square'),
			count : $('#range-count')
		}
	}

	var rangesData = {
		square: {
			min    : Number(ranges.list.square.attr(ranges.attr.min)),
			max    : Number(ranges.list.square.attr(ranges.attr.max)),
			current: Number(ranges.list.square.attr(ranges.attr.current)),
			prefix : ranges.list.square.attr(ranges.attr.prefix),
		},
		count: {
			min    : Number(ranges.list.count.attr(ranges.attr.min)),
			max    : Number(ranges.list.count.attr(ranges.attr.max)),
			current: Number(ranges.list.count.attr(ranges.attr.current)),
			prefix : ranges.list.count.attr(ranges.attr.prefix),
		}
	}

	function initRange(name) {
		if (ranges.list[name].length == 1) {
			var slider = ranges.list[name].find(ranges.cls.wrap)[0];
			noUiSlider.create(slider, {
				start: rangesData[name].current,
				step: 1,
				connect: [true, false],
				tooltips: true,
				range: {
					min: rangesData[name].min,
					max: rangesData[name].max
				},
				format: {
					to: function (value) {
						return '<strong>' + Math.floor(value) + '</strong> ' + rangesData[name].prefix;
					},
					from: function (value) {
						return value;
					}
				}
			});
			slider.noUiSlider.on('update', function(values, handle, unencoded, tap, positions, noUiSlider){
				$('input[name = '+ name +']').val(values[0]);
			})
		}
	}
	initRange('square');
	initRange('count');

	$('a[href ^= \\#]').click(function (event) {
		var id  = $(this).attr('href');
		if(id.charAt(0) == '#'){
			event.preventDefault();
			var top = $(id).offset().top;
			$('body,html').animate({scrollTop: top}, 1000);
		}
	});

	var hum = $('.hum'),
			humClass = '--toggle',
			nav = $('.header__inner'),
			navClass = '--toggle',
			bg  = $('.bg-mobile'),
			bgClass = '--toggle',
			inner = $('html, body'),
			innerClass = '--scroll-none'

	function toggleNav() {
		hum.toggleClass(humClass);
		nav.toggleClass(navClass);
		bg.toggleClass(bgClass);
		inner.toggleClass(innerClass);
	}

	hum.on('click', function () {
		toggleNav();
	});

	bg.on('click', function () {
		toggleNav();
	});
});
