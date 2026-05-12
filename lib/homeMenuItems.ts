export type HomeMenuDualItem = {
  itemName: string;
  itemDescription: string;
  regularPrice: string;
  largePrice: string;
};

export type HomeMenuSingleItem = {
  itemName: string;
  itemDescription: string;
  regularPrice: string;
};

export const homeMenuVegPizzas: HomeMenuDualItem[] = [
  {
    itemName: "Margherita Magic",
    itemDescription:
      "A classic with tomato sauce, mozzarella, and golden thin crust.",
    regularPrice: "$7.99",
    largePrice: "$10.99",
  },
  {
    itemName: "Farmhouse Crunch",
    itemDescription:
      "Mushrooms, bell peppers, olives, and onions on a cheesy crust.",
    regularPrice: "$8.99",
    largePrice: "$11.99",
  },
  {
    itemName: "Paneer Tandoori Twist",
    itemDescription:
      "Spiced paneer with onions, capsicum, and tikka sauce on a thin crust.",
    regularPrice: "$7.49",
    largePrice: "$9.49",
  },
  {
    itemName: "Cheesy Corn Carnival",
    itemDescription:
      "Mushrooms, sweet corn, jalapeños, olives, and melted cheese.",
    regularPrice: "$6.99",
    largePrice: "$9.49",
  },
  {
    itemName: "Spicy Veggie Volcano",
    itemDescription:
      "A fiery mix of peppers, onions, jalapeños, and molten cheese.",
    regularPrice: "$4.99",
    largePrice: "$6.99",
  },
  {
    itemName: "Italian Garden Delight",
    itemDescription:
      "Tomatoes, zucchini, olives, and basil drizzled with olive oil.",
    regularPrice: "$3.99",
    largePrice: "$7.99",
  },
  {
    itemName: "Green Goodness",
    itemDescription:
      "Spinach, broccoli, zucchini, and herbs on a wholesome thin crust.",
    regularPrice: "$8.49",
    largePrice: "$10.49",
  },
  {
    itemName: "Mexi-Corn Fiesta",
    itemDescription:
      "Corn, capsicum, onions, jalapeños, and olives with salsa sauce.",
    regularPrice: "$6.49",
    largePrice: "$8.49",
  },
];

export const homeMenuNonVegPizzas: HomeMenuDualItem[] = [
  {
    itemName: "Pepperoni Powerhouse",
    itemDescription:
      "Layers of pepperoni with mozzarella and marinara on the crust.",
    regularPrice: "$10.99",
    largePrice: "$12.99",
  },
  {
    itemName: "BBQ Chicken Melt",
    itemDescription:
      "Grilled chicken with BBQ sauce, onions, and gooey mozzarella.",
    regularPrice: "$6.49",
    largePrice: "$9.99",
  },
  {
    itemName: "Tandoori Chicken Blaze",
    itemDescription: "Chicken tikka with onions, capsicum, and smoky spices.",
    regularPrice: "$9.49",
    largePrice: "$11.49",
  },
  {
    itemName: "Meat Lovers Supreme",
    itemDescription: "Pepperoni, sausage, chicken, and ham with melted cheese.",
    regularPrice: "$7.49",
    largePrice: "$9.49",
  },
  {
    itemName: "Peri Peri Chicken Punch",
    itemDescription:
      "Chicken tossed in peri peri sauce with onions for flavor.",
    regularPrice: "$3.99",
    largePrice: "$7.49",
  },
  {
    itemName: "Spicy Chicken Keema Delight",
    itemDescription:
      "Minced chicken keema with jalapeños, herbs, and melted cheese.",
    regularPrice: "$6.49",
    largePrice: "$11.49",
  },
];

export const homeMenuAddons: HomeMenuSingleItem[] = [
  {
    itemName: "Extra Cheese",
    itemDescription: "Double the cheesy indulgence on your favorite pizza.",
    regularPrice: "$1.99",
  },
  {
    itemName: "Garlic Dip",
    itemDescription: "Creamy garlic dip that's smooth, rich, and flavorful.",
    regularPrice: "$2.99",
  },
  {
    itemName: "Chili Flakes & Oregano Pack",
    itemDescription: "Zesty mix of chili flakes and oregano.",
    regularPrice: "$0.99",
  },
  {
    itemName: "Stuffed Crust Upgrade",
    itemDescription: "Cheesy stuffed-crust baked to perfection.",
    regularPrice: "$3.99",
  },
];

export const homeMenuDesserts: HomeMenuSingleItem[] = [
  {
    itemName: "Choco Lava Slice",
    itemDescription:
      "Decadent slice with molten chocolate lava at the center.",
    regularPrice: "$4.99",
  },
  {
    itemName: "Mini Nutella Pizza",
    itemDescription: "Crispy mini pizza topped with smooth Nutella spread.",
    regularPrice: "$2.99",
  },
  {
    itemName: "Tiramisu Jar",
    itemDescription:
      "Creamy tiramisu layers in a jar, dusted with cocoa powder.",
    regularPrice: "$3.99",
  },
  {
    itemName: "Classic Cheesecake",
    itemDescription: "Smooth, creamy cheesecake topped with a hint of vanilla.",
    regularPrice: "$5.99",
  },
  {
    itemName: "Brownie Fudge Delight",
    itemDescription: "Rich chocolate brownie layered with gooey fudge and nuts.",
    regularPrice: "$4.49",
  },
];
