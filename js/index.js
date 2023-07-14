$(function() {
    const sideMenu = $('#side-menu');
    const sideMenuList = $('#side-menu').children('li');
    const nestedSideMenu = $('#nested-side-menu > li');
    const overlay = $('#overlay');
    const menuToggler = $('#menu-toggler');

    // initial page setup..
    document.body.style.setProperty('--menu-top-offset', `${$('header').height()}px`);
    document.body.style.setProperty('--menu-left-offset', `${$('#side-menu').width()}px`);
    $(window).resize(function(){
        document.body.style.setProperty('--menu-top-offset', `${$('header').height()}px`);
        if (sideMenu.hasClass('active')) document.body.style.setProperty('--menu-left-offset', `${$('#side-menu').width()}px`);
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
        overlay.click(function() {
            overlay.removeClass('active');
            wrapper.removeClass('active');
            target.removeClass('active');
        })
    }); 

    menuToggler.click(() => {
        sideMenu.toggleClass('active');
        if (sideMenu.hasClass('active')) {
            document.body.style.setProperty('--menu-left-offset', `${sideMenu.width()}px`);
        } else {
            document.body.style.setProperty('--menu-left-offset', '0');
        }
    })
})