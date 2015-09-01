/**
 * @author Marcel Liebgott <marcel@mliebgott.de>
 * @version 1.00
 *
 * this jquery plugin shows you tooltip
 *
 * @require jquery
 */
(function($){
        $.TooltipService = {
                /**
                 * @author Marcel Liebgott <marcel@mliebgott.de>
                 * @since 1.00
                 *
                 * handle the mouse event for this tooltip
                 */
                handle: function(){
                        $('.tooltipImage').hover(function(){
                                var title = $(this).data("title");
                                var text = $(this).data("message");
                                var linkString = "";
                               
                                // links supported?
                                if($.type($(this).data("link")) !== "undefined"){
                                        var links = $(this).data("link");
                               
                                        if(links.length > 0){
                                                // prepare links
                                                var linkArray = links.split(",");
                                                var link = [];
                                               
                                                for(var i = 0; i < linkArray.length; i++){
                                                        var tmpLink = linkArray[i].split("|");
                                                        // check if link is valid
                                                        var _link = "";
                                                        var regexProtocol = /^((http|https|ftp):\/\/)/i;

                                                        if(!(regexProtocol.test(tmpLink[1]))){
                                                                _link = "http://" + tmpLink[1];
                                                        }else{
                                                                _link = tmpLink[1];
                                                        }

                                                        link.push({
                                                                linkDesc: tmpLink[0],
                                                                linkSrc: _link
                                                        });
                                                }
                                               
                                                // build unordered link list string
                                                if(link.length > 0){
                                                        linkString += "<ul id='relatedLinks'>";
                                                                for(var j = 0; j < link.length; j++){
                                                                        linkString += "<li><a href='" + link[j].linkSrc + "' target='_blank'>" + link[j].linkDesc + "</a></li>";
                                                                }
                                                        linkString += "</ul>";
                                                }
                                        }
                                }

                                // create tooltip
                                var tooltip = $("<div class='tooltip'>" +
                                                "<h3>" + title + "</h3>" +
                                                "<p>" + text + "</p>" +
                                                (linkString.length > 0 ? linkString : "") +
                                        "</div>");
                               
                                // create a tooltip div and append them below the fired element
                                $(this).parent().append(tooltip);
                        }, function(){
                                // if appended element is hovered, so show them
                                $('.tooltipIcon').parent().find('.tooltip').on('mouseenter', function(){
                                        $(this).show();
                                });
                               
                                // if appended element isn't hovered and .tooltipIcon mouseleaved so hide tooltip
                                $('.tooltipIcon').on('mouseleave', function(){
                                        $(this).parent().find('.tooltip').remove();
                                });
                               
                                // remove them, when leave mouse
                                $('.tooltipIcon').parent().find('.tooltip').on('mouseleave', function(){
                                        $(this).remove();
                                });
                                
                                // remove tooltip - IE8 hack
                                $('.tooltip').on('mouseleave', function(){
                                        $('.tooltip').remove();
                                });
                                })
                        });
                }
        };
})(jQuery);
