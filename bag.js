const CONVENIENCE_FEE =99;
let bagItemsObjects;
 onLoad();

function onLoad(){
   loadbagItemsObjects();
  displayBagItems();
  displayBagSummary();
};

function displayBagSummary(){
    let bagSummaryElement =document.querySelector('.bag-summary');
    
    let totalItem = bagItemsObjects.length;
    let tolalMRP = 0;
    let totalDicount = 0;
    
    
    bagItemsObjects.forEach(bagItem =>{
        tolalMRP += bagItem.original_price;
        totalDicount += bagItem.original_price - bagItem.current_price;
        
    })
    let finalPayment = tolalMRP - totalDicount + CONVENIENCE_FEE  ;
    bagSummaryElement.innerHTML=`
        <div class="bag-details-container">
                        <div class="price-header">PRICE DETAILS ( ${totalItem} Items)
                        </div>
                        <div class="price-item">
                            <span class="price-item-tag">Total MRP</span>
                            <span class="price-item-value">₹ ${tolalMRP}</span>
                        </div>
                        
                        <div class="price-item">
                          <span class="price-item-tag">Discount on MRP</span>  
                          <span class="price-item-value  priceDetail-base-discount">₹ ${totalDicount}</span>  
                        </div>
                        <div class="price-item">
                          <span class="price-item-tag">convenience Fee</span>  
                          <span class="price-item-value">₹ 99</span>  
                        </div>
                        
                         <div class="price-footer">
                          <span class="price-item-tag">Total Amount</span>  
                          <span class="price-item-value">₹ ${finalPayment}</span> </div>
                         <div><button class="btn-place-order" >PLACE ORDER  </button></div>`;
}
function loadbagItemsObjects(){

bagItemsObjects = bagItems.map(itemId =>{
    for(let i= 0; i < items.length;i++){
        if(itemId == items[i].id){
            return items[i];
        }
    }
});
console.log(bagItemsObjects);
}

function removeFromCart(itemId){
    bagItems =bagItems.filter(bagItemId => bagItemId != itemId);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    loadbagItemsObjects();
    displayBagIcon();
    displayBagItems();
    displayBagSummary()
    
};
function displayBagItems(){
    
  let containerElement = document.querySelector('.bag-Items-container');
  let innerHTML='';
  bagItemsObjects.forEach(bagItems =>{innerHTML+= generateItemHTML(bagItems);})
   containerElement.innerHTML = innerHTML;
}
function generateItemHTML(item){
    return ` <div class="bag-item-container">
                    <div class="item-left-part">
                        <img class="bag-item-img" src="${item.image}" alt="">
                    </div>
                    <div class="item-right-part">
                    <div class="company">${item.company}</div>
                    <div class="item-name">${item.item_name}</div>
                    <div class="price-container">
                        <span class="current-price">₹ ${item.current_price}</span>
                        <span class="orignal-price">${item.original_price}</span>
                        <span class="discount-percentage">(${item.discount_percentage}%  OFF)</span>
                    </div>
                    <div class="return-period">
                        <span class="return-period-day">${item.return_period} return available</span>
                    </div>
                    <div class="delivery-details">
                        Delivery by
                        <span class="delivery-details-days">${item.delivery_date}</span>
                         
                    </div>
                    </div>
                    <div class="remove-from-cart" onclick="removeFromCart(${item.id});">x
                    </div>
                </div>`;
}

  const placeOrderBtn = document.querySelector(".btn-place-order");
  const loadingScreen = document.getElementById("loadingScreen");
  const confirmationScreen = document.getElementById("confirmationScreen");
  const backBtn = document.getElementById("backBtn");

  placeOrderBtn?.addEventListener("click", () => {
    // Show loader
    loadingScreen.style.display = "flex";

    // After 2 seconds, hide loader & show confirmation
    setTimeout(() => {
      loadingScreen.style.display = "none";
      confirmationScreen.style.display = "flex";
    }, 3000);
  });

  // Back button → hide confirmation
  backBtn.addEventListener("click", () => {
    confirmationScreen.style.display = "none";
  });
