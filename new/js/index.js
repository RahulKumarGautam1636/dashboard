$(function() {
    const sideMenu = $('#side-menu');
    const sideMenuList = $('#side-menu').children('li');
    const nestedSideMenu = $('#nested-side-menu > li');
    const overlay = $('#overlay');
    const menuToggler = $('#menu-toggler');
    const summary = $('.summary');
    const panelToggler = $('#panel-toggler');
    const colorPanel = $('.color-modal');
    const filterToggler = $('.filter-toggler');
    const filterPanel = $('#filter-panel');

    // initial page setup..
    document.body.style.setProperty('--menu-top-offset', `${$('header').height()}px`);
    document.body.style.setProperty('--menu-left-offset', `${$('.side-menu')[0].clientWidth}px`);
    summary.css('font-size', 'clamp(0.2em, 2.8vw, 1em)'); 
    $(window).resize(function(){
        document.body.style.setProperty('--menu-top-offset', `${$('header').height()}px`);
        if (sideMenu.hasClass('active')) document.body.style.setProperty('--menu-left-offset', `${$('.side-menu')[0].clientWidth}px`);
    });
    
    
    sideMenuList.mouseenter(function() {
        const wrapper = $('#nested-side-menu');
        const target = $(this);
        overlay.addClass('active');
        wrapper.addClass('active');
        sideMenuList.removeClass('active');
        target.addClass('active')
        const parent = target.attr('side-parent');
        nestedSideMenu.hide();
        const child = $('#nested-side-menu').find(`[side-child='${parent}']`);
        child.toggle();
        overlay.hover(function() {
            overlay.removeClass('active');
            wrapper.removeClass('active');
            target.removeClass('active');
        })
    }); 

    menuToggler.click(() => {
        sideMenu.toggleClass('active');
        if (sideMenu.hasClass('active')) {
            document.body.style.setProperty('--menu-left-offset', `${$('.side-menu')[0].clientWidth}px`);
            summary.css('font-size', 'clamp(0.2em, 2.8vw, 1em)');                               
        } else {
            document.body.style.setProperty('--menu-left-offset', '0');
            summary.css('font-size', '1em');
        }
    })

    panelToggler.click(() => {
        colorPanel.toggleClass('active');
    })

    filterToggler.click(() => {
        filterPanel.slideToggle();
    })

    $('#nested-side-menu li .menu-toggler').click(function() {
        const target = $(this).parent().next('.menu-wrapper');
        const parent = $(this).parent().parent('.menu-wrapper');
        const parents = $(this).parent().parents('.menu-wrapper');
        console.log(target.css('max-height'));
        if (target.css('max-height') === '0px') {
            target.css('max-height', target.children('ul').outerHeight() + 'px');
            parents.css('max-height', '+=' + target.children('ul').outerHeight() + 'px');
        } else {
            target.css('max-height', 0);
            parent.css('max-height', 0);
        }
    })
    
})



var parent = document.querySelector('#parent');
const clr = getComputedStyle(document.body).getPropertyValue('--clr-primary');
var clr1 = clr.replace('deg', '');

var picker = new Picker({
    parent: parent,
    color: clr1,
    popup: false
});

picker.onChange = function(color) {
    parent.style.background = color.rgbaString;
    const hue = color.hsla[0] * 360;
    const sat = color.hsla[1] * 100;
    const lit = color.hsla[2] * 100;
    // setRootColors(hue, sat, lit);
};

// function setRootColors(hue, sat, lit) {
//     document.querySelector(':root').style.setProperty('--hue', `${hue}deg`);
//     document.querySelector(':root').style.setProperty('--sat', `${sat}%`);
//     document.querySelector(':root').style.setProperty('--lit', `${lit}%`);
//     const bgTertiary = getComputedStyle(document.body).getPropertyValue('--bg-tertiary');
//     const bgPrimary = getComputedStyle(document.body).getPropertyValue('--clr-primary');

//     picker.setColor(`hsl(${hue}, ${sat}%, ${lit}%)`, true);

//     const pieChartOptions = {
//         color: [`hsla(${hue}deg, ${sat}%, 40%)`, `hsla(${hue}deg, ${sat}%, 45%)`, `hsla(${hue}deg, ${sat}%, 50%)`, `hsla(${hue}deg, ${sat}%, 55%)`, `hsla(${hue}deg), ${sat}%, 60%)`, `hsla(${hue}deg), ${sat}%, 65%)`],
//     }
//     const eChartBarOptions = {
//         series: [{
//             color: `hsla(${hue}deg, ${sat}%, 85%)`
//         }, {
//            color: `hsla(${hue}deg, ${sat}%, 50%)` 
//         }]
//     }
//     const lineChart1Options = {
//         series: [{
//             areaStyle: {
//                 color: bgTertiary,
//             },
//             lineStyle: {
//                 color: `hsla(${hue}deg, ${sat}%, 65%)`
//             },
//             itemStyle: {
//                 color: bgPrimary
//             }
//         }]
//     }
    
//     eChartPie.setOption(pieChartOptions);
//     eChartBar.setOption(eChartBarOptions);
//     lineChart1.setOption(lineChart1Options);
//     // lineChart2.setOption(lineChart2Options);
// }

function toggleDarkMode() {
    $('body').toggleClass('dark-mode');
}