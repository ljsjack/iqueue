var name ;
var price;

$(function(){

    $(".dropdown-menu").on('click', 'li a', function(){
        $(".btn:first-child").text($(this).text());
        $(".btn:first-child").val($(this).text());
    });

});
$(".put-in-cart").click(function(event){
    event.preventDefault();
    //var name = $(this).attr("data-name");
    //var price = Number($(this).attr("data-price"));
    name = $(this).attr("data-name");
    price = Number($(this).attr("data-price"));
    console.log(name);

});
$(".add-to-cart").click(function(event){
    event.preventDefault();
    /*var name = $(".put-in-cart").attr("data-name");
     console.log(name);
     var price = Number($(".put-in-cart").attr("data-price"));*/
    shoppingCart.addItemToCart(name, price, 1);
    if (price === undefined){
        alert("Please choose an item from the dropdown button!")
    }
    else {
        alert("Item added to cart!");
    }
    displayCart();
});
$("#clear-cart").click(function(event){
    shoppingCart.clearCart();
    alert("Cart cleared!");
    name = null;
    displayCart();
});
function displayCart() {
    var cartArray = shoppingCart.listCart();
    console.log(cartArray);
    var output = "";
    for (var i in cartArray) {
        output += "<li>"
            +cartArray[i].name
            +" <input class='item-count' type='number.toFixed(0)' data-name='"
            +cartArray[i].name
            +"' value='"+cartArray[i].count+"' >"
            +" x "+cartArray[i].price
            +" = "+cartArray[i].total
            +" <button class='plus-item' data-name='"
            +cartArray[i].name+"'>+</button>"
            +" <button class='subtract-item' data-name='"
            +cartArray[i].name+"'>-</button>"
            +" <button class='delete-item' data-name='"
            +cartArray[i].name+"'>X</button>"
            +"</li>";
    }
    $("#show-cart").html(output);
    $("#count-cart").html( shoppingCart.countCart() );
    $("#total-cart").html( shoppingCart.totalCart() );
}
$("#show-cart").on("click", ".delete-item", function(event){
    var name = $(this).attr("data-name");
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
});
$("#show-cart").on("click", ".subtract-item", function(event){
    var name = $(this).attr("data-name");
    shoppingCart.removeItemFromCart(name);
    displayCart();
});
$("#show-cart").on("click", ".plus-item", function(event){
    var name = $(this).attr("data-name");
    shoppingCart.addItemToCart(name, 0, 1);
    displayCart();
});
$("#show-cart").on("change", ".item-count", function(event){
    var name = $(this).attr("data-name");
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});
displayCart();/**
 * Created by BrehmerChan on 28/7/2016.
 */
