// // -------- Menus of a business that serve food dishes.
// export type FoodMenus = {
//   name: string; //Required. Google identifier for this location in the form: accounts/{accountId}/locations/{locationId}/foodMenus
//   menus?: FoodMenu[]; // Optional. A collection of food menus.
// };

// // -------- Menu of a business that serves food dishes.
// export type FoodMenu = {
//   labels: MenuLabel[]; // Required. Language-tagged labels for the menu. E.g. "menu", "lunch special". Display names should be 140 characters or less, with descriptions 1,000 characters or less. At least one set of labels is required.
//   sourceUrl?: string; //Optional. Source URL of menu if there is a webpage to go to.
//   sections: FoodMenuSection[]; // Required. Sections of the menu.
//   cuisines?: Cuisine[]; // Optional. Cuisine information for the food menu. It is highly recommended to provide this field.
// };

// // -------- Section of a menu. It can contain multiple items/dishes.
// export type FoodMenuSection = {
//   labels: MenuLabel[]; // Required. Language tagged labels for this menu section. Display names should be 140 characters or less, with descriptions 1,000 characters or less. At least one set of labels is required.
//   items: FoodMenuItem[]; // Required. Items of the section. Each Section must have at least an item.
// };

// // -------- Item of a Section. It can be the dish itself, or can contain multiple FoodMenuItemOption.
// export type FoodMenuItem = {
//   labels: MenuLabel[]; // Required. Language tagged labels for this menu item. Display names should be 140 characters or less, with descriptions 1,000 characters or less. At least one set of labels is required.
//   attributes: FoodMenuItemAttributes[]; // Required. Detailed attributes of the item. When item options are specified, this is considered as the base attributes and populate to each options.
//   options?: FoodMenuItemOption[]; // Optional. This is for an item that comes in multiple different options, and users are required to make choices. E.g. "regular" vs. "large" pizza. When options are specified, labels and attributes at item level will automatically become the first option's labels and attributes. Clients only need to specify other additional food options in this field.
// };

// // -------- Attributes of a food item/dish.
// export type FoodMenuItemAttributes = {
//   price: Money; // Required. Price of the food dish.
//   spiciness?: Spiciness; // Optional. Spiciness level of the food dish.
//   allergen?: Allergen[]; // Optional. Allergens associated with the food dish. It is highly recommended to provide this field.
//   dietaryRestriction?: DietaryRestriction[]; // Optional. Dietary information of the food dish. It is highly recommended to provide this field.
//   nutritionFacts?: NutritionFacts; // Optional. Nutrition facts of the food dish option. It is highly recommended to provide this field.
//   ingredients?: Ingredient[]; // Optional. Ingredients of the food dish option.
//   servesNumPeople?: number; // Optional. Number of people can be served by this food dish option.
//   preparationMethods?: PreparationMethod[]; // Optional. Methods on how the food dish option is prepared.
//   portionSize?: PortionSize; // Optional. Size of the order, represented in units of items. (e.g. 4 "skewers", 6 "pieces")
//   mediaKeys?: string[]; // Optional. The media keys of the media associated with the dish. Only photo media is supported. When there are multiple photos associated, the first photo is considered as the preferred photo.
// };

// // -------- Serving portion size of a food dish.
// export type PortionSize = {
//   quantity: number; // Required. Number of the portion.
//   unit: MenuLabel[]; // Required. The repeated nameInfo field is for the unit in multiple languages.
// };
// // -------- This message represents nutrition facts for a food dish.
// export type NutritionFacts = {
//   calories?: CaloriesFact; // Optional. Calories of the dish.
//   totalFat?: NutritionFact; // Optional. Fat information for a given food dish.
//   cholesterol?: NutritionFact; // Optional. Cholesterol information for a given food dish.
//   sodium?: NutritionFact; // Optional. Sodium information for a given food dish.
//   totalCarbohydrate?: NutritionFact; // Optional. Carbohydrate information for a given food dish.
//   protein?: NutritionFact; // Optional. Protein information for a given food dish.
// };

// // -------- This message denotes an ingredient information of a food dish.
// export type Ingredient = {
//   labels: MenuLabel[]; // Required. Labels to describe ingredient. Display names should be 140 characters or less, with descriptions 1,000 characters or less. At least one set of labels is required.
// };

// // -------- This message denotes nutrition information with an upper bound and lower bound range and can be represented by mass unit. Lower amount must be specified. Both lower and upper amounts are non-negative numbers.
// export type NutritionFact = {
//   lowerAmount: number; // Required. Lower amount of nutrition
//   upperAmount?: number; // Optional. Upper amount of nutrition
//   unit: MassUnit; // Required. Unit of the given nutrition information.
// };

// // -------- This message denotes calories information with an upper bound and lower bound range. Lower amount must be specified. Both lower and upper amounts are non-negative numbers.
// export type CaloriesFact = {
//   lowerAmount: number; // Required. Lower amount of calories
//   upperAmount?: number; // Optional. Upper amount of calories
//   unit: EnergyUnit; // Required. Unit of the given calories information.
// };

// // -------- Option of an Item. It requires an explicit user selection.
// export type FoodMenuItemOption = {
//   labels: MenuLabel; // Required. Language tagged labels for this menu item option. E.g.: "beef pad thai", "veggie pad thai", "small pizza", "large pizza". Display names should be 140 characters or less, with descriptions 1,000 characters or less. At least one set of labels is required.
//   attributes: FoodMenuItemAttributes; // Required. Detailed attributes of the item option. Individual unspecified attributes will be inherited from the item-level attibutes as the base.
// };

// export type Money = {
//   currencyCode: string; // The three-letter currency code defined in ISO 4217.
//   units: string; // The whole units of the amount. For example if currencyCode is "USD", then 1 unit is one US dollar.
//   nanos: number; // Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If units is positive, nanos must be positive or zero. If units is zero, nanos can be positive, zero, or negative. If units is negative, nanos must be negative or zero. For example $-1.75 is represented as units=-1 and nanos=-750,000,000.
// };

// export type MenuLabel = {
//   displayName: string; // Required. Display name of the component.
//   description?: string; // Optional. Supplementary information of the component.
//   languageCode?: string; // Optional. The BCP 47 code of language. If the language is not available, it will default to English.
// };

// // -------- Preparation method of a food dish.
// export enum PreparationMethod {
//   PREPARATION_METHOD_UNSPECIFIED = "Preparation method unspecified",
//   BAKED = "Baked method",
//   BARBECUED = "Barbecued method",
//   BASTED = "Basted method",
//   BLANCHED = "Blanched method",
//   BOILED = "Boiled method",
//   BRAISED = "Braised method",
//   CODDLED = "Coddled method",
//   FERMENTED = "Fermented method",
//   FRIED = "Fried method",
//   GRILLED = "Grilled method",
//   KNEADED = "Kneaded method",
//   MARINATED = "Marinated method",
//   PAN_FRIED = "Pan fried method",
//   PICKLED = "Pickled method",
//   PRESSURE_COOKED = "Pressure cooked method",
//   ROASTED = "Roasted method",
//   SAUTEED = "Sauteed method",
//   SEARED = "Seared method",
//   SIMMERED = "Simmered method",
//   SMOKED = "Smoked method",
//   STEAMED = "Steamed method",
//   STEEPED = "Steeped method",
//   STIR_FRIED = "Stir fried method",
//   OTHER_METHOD = "Other method",
// }

// // -------- Possible units of mass.
// export enum MassUnit {
//   MASS_UNIT_UNSPECIFIED = "Mass unit unspecified",
//   GRAM = "Gram",
//   MILLIGRAM = "Milligram",
// }

// // -------- Possible units of food energy (calories).
// export enum EnergyUnit {
//   ENERGY_UNIT_UNSPECIFIED = "Energy unit unspecified",
//   CALORIE = "Calorie",
//   JOULE = "Joule",
// }

// export enum DietaryRestriction {
//   DIETARY_RESTRICTION_UNSPECIFIED = "Dietary type unspecified",
//   HALAL = "Denotion of the food as a halal dish",
//   KOSHER = "Denotion of the food as a kosher dish",
//   ORGANIC = "Denotion of the food as an organic dish",
//   VEGAN = "Denotion of the food as a vegan dish",
//   VEGETARIAN = "Denotion of the food as a vegetarian dish",
// }

// export enum Allergen {
//   ALLERGEN_UNSPECIFIED = "Allergen unspecified",
//   DAIRY = "Dairy related allergen",
//   EGG = "Egg related allergen",
//   FISH = "Fish related allergen",
//   PEANUT = "Peanut related allergen",
//   SHELLFISH = "Shellfish related allergen",
//   SOY = "Soy related allergen",
//   TREE_NUT = "Tree nut related allergen",
//   WHEAT = "Wheat related allergen",
// }

// export enum Spiciness {
//   SPICINESS_UNSPECIFIED = "Level unspecified",
//   MILD = "Denotion of mild spicy",
//   MEDIUM = "Denotion of medium spicy",
//   HOT = "Denotion of hot spicy. The most spiciest level",
// }

// export enum Cuisine {
//   CUISINE_UNSPECIFIED = "Cuisine unspecified",
//   AMERICAN = "American food",
//   ASIAN = "Asian food",
//   BRAZILIAN = "Brazilian food",
//   BREAK_FAST = "Breakfast",
//   BRUNCH = "Brunch",
//   CHICKEN = "Chicken",
//   CHINESE = "Chinese food",
//   FAMILY = "Family style cuisine",
//   FAST_FOOD = "Fast food",
//   FRENCH = "French food",
//   GREEK = "Greek food",
//   GERMAN = "German food",
//   HAMBURGER = "Hamburger",
//   INDIAN = "Indian food",
//   INDONESIAN = "Indonesian food",
//   ITALIAN = "Italian food",
//   JAPANESE = "Japanese food",
//   KOREAN = "Korean food",
//   LATIN_AMERICAN = "Latin American food",
//   MEDITERRANEAN = "Mediterranean food",
//   MEXICAN = "Mexican food",
//   PAKISTANI = "Pakistani food",
//   PIZZA = "Pizza",
//   SEAFOOD = "Seafood",
//   SPANISH = "Spanish food",
//   SUSHI = "Sushi",
//   THAI = "Thai food",
//   TURKISH = "Turkish food",
//   VEGETARIAN = "Vegetarian Food",
//   VIETNAMESE = "Vietnamese food",
//   OTHER_CUISINE = "Other cuisine",
// }
