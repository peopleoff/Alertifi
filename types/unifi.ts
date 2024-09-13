type ImageObject = {
  url: string;
  width: string;
  height: string;
};

type Brand = {
  name: string;
};

type PriceSpecification = {
  price: number;
  priceCurrency: string;
  valueAddedTaxIncluded: boolean;
};

type Offer = {
  availability: string;
  priceSpecification: PriceSpecification;
};

type Product = {
  brand: Brand;
  name: string;
  description: string;
  sku: string;
  url: string;
  image: ImageObject;
  offers: Offer;
  inStock: boolean;
};

type ProductGroup = {
  name: string;
  description: string;
  url: string;
  image: ImageObject;
  hasVariant: Product[];
  offers: Offer;
};

export type {
  Product,
  ProductGroup,
  ImageObject,
  Brand,
  PriceSpecification,
  Offer,
};
