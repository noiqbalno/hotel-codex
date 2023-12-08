import _sequelize, {Sequelize} from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _address from  "./address.js";
import _bank from  "./bank.js";
import _booking_order_detail from  "./booking_order_detail.js";
import _booking_order_detail_extra from  "./booking_order_detail_extra.js";
import _booking_orders from  "./booking_orders.js";
import _category_group from  "./category_group.js";
import _city from  "./city.js";
import _country from  "./country.js";
import _department from  "./department.js";
import _employee from  "./employee.js";
import _employee_department_history from  "./employee_department_history.js";
import _employee_pay_history from  "./employee_pay_history.js";
import _entity from  "./entity.js";
import _facilities from  "./facilities.js";
import _facility_photos from  "./facility_photos.js";
import _facility_price_history from  "./facility_price_history.js";
import _hotel_reviews from  "./hotel_reviews.js";
import _hotels from  "./hotels.js";
import _job_role from  "./job_role.js";
import _joinmenu from  "./joinmenu.js";
import _members from  "./members.js";
import _order_menu_detail from  "./order_menu_detail.js";
import _order_menus from  "./order_menus.js";
import _payment_gateway from  "./payment_gateway.js";
import _payment_transaction from  "./payment_transaction.js";
import _policy from  "./policy.js";
import _policy_category_group from  "./policy_category_group.js";
import _price_items from  "./price_items.js";
import _provinces from  "./provinces.js";
import _purchase_order_detail from  "./purchase_order_detail.js";
import _purchase_order_header from  "./purchase_order_header.js";
import _regions from  "./regions.js";
import _resto_menu_photos from  "./resto_menu_photos.js";
import _resto_menus from  "./resto_menus.js";
import _roles from  "./roles.js";
import _service_task from  "./service_task.js";
import _shift from  "./shift.js";
import _special_offer_coupons from  "./special_offer_coupons.js";
import _special_offers from  "./special_offers.js";
import _stock_detail from  "./stock_detail.js";
import _stock_photo from  "./stock_photo.js";
import _stocks from  "./stocks.js";
import _user_accounts from  "./user_accounts.js";
import _user_bonus_points from  "./user_bonus_points.js";
import _user_breakfast from  "./user_breakfast.js";
import _user_members from  "./user_members.js";
import _user_password from  "./user_password.js";
import _user_profiles from  "./user_profiles.js";
import _user_roles from  "./user_roles.js";
import _users from  "./users.js";
import _vendor from  "./vendor.js";
import _vendor_product from  "./vendor_product.js";
import _work_order_detail from  "./work_order_detail.js";
import _work_orders from  "./work_orders.js";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

function initModels(sequelize) {
  const address = _address.init(sequelize, DataTypes);
  const bank = _bank.init(sequelize, DataTypes);
  const booking_order_detail = _booking_order_detail.init(sequelize, DataTypes);
  const booking_order_detail_extra = _booking_order_detail_extra.init(sequelize, DataTypes);
  const booking_orders = _booking_orders.init(sequelize, DataTypes);
  const category_group = _category_group.init(sequelize, DataTypes);
  const city = _city.init(sequelize, DataTypes);
  const country = _country.init(sequelize, DataTypes);
  const department = _department.init(sequelize, DataTypes);
  const employee = _employee.init(sequelize, DataTypes);
  const employee_department_history = _employee_department_history.init(sequelize, DataTypes);
  const employee_pay_history = _employee_pay_history.init(sequelize, DataTypes);
  const entity = _entity.init(sequelize, DataTypes);
  const facilities = _facilities.init(sequelize, DataTypes);
  const facility_photos = _facility_photos.init(sequelize, DataTypes);
  const facility_price_history = _facility_price_history.init(sequelize, DataTypes);
  const hotel_reviews = _hotel_reviews.init(sequelize, DataTypes);
  const hotels = _hotels.init(sequelize, DataTypes);
  const job_role = _job_role.init(sequelize, DataTypes);
  const joinmenu = _joinmenu.init(sequelize, DataTypes);
  const members = _members.init(sequelize, DataTypes);
  const order_menu_detail = _order_menu_detail.init(sequelize, DataTypes);
  const order_menus = _order_menus.init(sequelize, DataTypes);
  const payment_gateway = _payment_gateway.init(sequelize, DataTypes);
  const payment_transaction = _payment_transaction.init(sequelize, DataTypes);
  const policy = _policy.init(sequelize, DataTypes);
  const policy_category_group = _policy_category_group.init(sequelize, DataTypes);
  const price_items = _price_items.init(sequelize, DataTypes);
  const provinces = _provinces.init(sequelize, DataTypes);
  const purchase_order_detail = _purchase_order_detail.init(sequelize, DataTypes);
  const purchase_order_header = _purchase_order_header.init(sequelize, DataTypes);
  const regions = _regions.init(sequelize, DataTypes);
  const resto_menu_photos = _resto_menu_photos.init(sequelize, DataTypes);
  const resto_menus = _resto_menus.init(sequelize, DataTypes);
  const roles = _roles.init(sequelize, DataTypes);
  const service_task = _service_task.init(sequelize, DataTypes);
  const shift = _shift.init(sequelize, DataTypes);
  const special_offer_coupons = _special_offer_coupons.init(sequelize, DataTypes);
  const special_offers = _special_offers.init(sequelize, DataTypes);
  const stock_detail = _stock_detail.init(sequelize, DataTypes);
  const stock_photo = _stock_photo.init(sequelize, DataTypes);
  const stocks = _stocks.init(sequelize, DataTypes);
  const user_accounts = _user_accounts.init(sequelize, DataTypes);
  const user_bonus_points = _user_bonus_points.init(sequelize, DataTypes);
  const user_breakfast = _user_breakfast.init(sequelize, DataTypes);
  const user_members = _user_members.init(sequelize, DataTypes);
  const user_password = _user_password.init(sequelize, DataTypes);
  const user_profiles = _user_profiles.init(sequelize, DataTypes);
  const user_roles = _user_roles.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);
  const vendor = _vendor.init(sequelize, DataTypes);
  const vendor_product = _vendor_product.init(sequelize, DataTypes);
  const work_order_detail = _work_order_detail.init(sequelize, DataTypes);
  const work_orders = _work_orders.init(sequelize, DataTypes);

  category_group.belongsToMany(policy, { as: 'poca_poli_id_policies', through: policy_category_group, foreignKey: "poca_cagro_id", otherKey: "poca_poli_id" });
  policy.belongsToMany(category_group, { as: 'poca_cagro_id_category_groups', through: policy_category_group, foreignKey: "poca_poli_id", otherKey: "poca_cagro_id" });
  roles.belongsToMany(users, { as: 'usro_user_id_users', through: user_roles, foreignKey: "usro_role_id", otherKey: "usro_user_id" });
  users.belongsToMany(roles, { as: 'usro_role_id_roles', through: user_roles, foreignKey: "usro_user_id", otherKey: "usro_role_id" });
  booking_order_detail_extra.belongsTo(booking_order_detail, { as: "boex_borde", foreignKey: "boex_borde_id"});
  booking_order_detail.hasMany(booking_order_detail_extra, { as: "booking_order_detail_extras", foreignKey: "boex_borde_id"});
  special_offer_coupons.belongsTo(booking_order_detail, { as: "soco_borde", foreignKey: "soco_borde_id"});
  booking_order_detail.hasMany(special_offer_coupons, { as: "special_offer_coupons", foreignKey: "soco_borde_id"});
  user_breakfast.belongsTo(booking_order_detail, { as: "usbr_borde", foreignKey: "usbr_borde_id"});
  booking_order_detail.hasMany(user_breakfast, { as: "user_breakfasts", foreignKey: "usbr_borde_id"});
  booking_order_detail.belongsTo(booking_orders, { as: "borde_boor", foreignKey: "borde_boor_id"});
  booking_orders.hasMany(booking_order_detail, { as: "booking_order_details", foreignKey: "borde_boor_id"});
  booking_order_detail.belongsTo(facilities, { as: "borde_faci", foreignKey: "borde_faci_id"});
  facilities.hasMany(booking_order_detail, { as: "booking_order_details", foreignKey: "borde_faci_id"});
  booking_orders.belongsTo(hotels, { as: "boor_hotel", foreignKey: "boor_hotel_id"});
  hotels.hasMany(booking_orders, { as: "booking_orders", foreignKey: "boor_hotel_id"});
  booking_order_detail_extra.belongsTo(price_items, { as: "boex_prit", foreignKey: "boex_prit_id"});
  price_items.hasMany(booking_order_detail_extra, { as: "booking_order_detail_extras", foreignKey: "boex_prit_id"});
  special_offer_coupons.belongsTo(special_offers, { as: "soco_spof", foreignKey: "soco_spof_id"});
  special_offers.hasMany(special_offer_coupons, { as: "special_offer_coupons", foreignKey: "soco_spof_id"});
  booking_orders.belongsTo(users, { as: "boor_user", foreignKey: "boor_user_id"});
  users.hasMany(booking_orders, { as: "booking_orders", foreignKey: "boor_user_id"});
  hotels.belongsTo(address, { as: "hotel_addr", foreignKey: "hotel_addr_id"});
  address.hasMany(hotels, { as: "hotels", foreignKey: "hotel_addr_id"});
  facilities.belongsTo(category_group, { as: "faci_cagro", foreignKey: "faci_cagro_id"});
  category_group.hasMany(facilities, { as: "facilities", foreignKey: "faci_cagro_id"});
  facility_photos.belongsTo(facilities, { as: "fapho_faci", foreignKey: "fapho_faci_id"});
  facilities.hasMany(facility_photos, { as: "facility_photos", foreignKey: "fapho_faci_id"});
  facility_price_history.belongsTo(facilities, { as: "faph_faci", foreignKey: "faph_faci_id"});
  facilities.hasMany(facility_price_history, { as: "facility_price_histories", foreignKey: "faph_faci_id"});
  facilities.belongsTo(hotels, { as: "faci_hotel", foreignKey: "faci_hotel_id"});
  hotels.hasMany(facilities, { as: "facilities", foreignKey: "faci_hotel_id"});
  hotel_reviews.belongsTo(hotels, { as: "hore_hotel", foreignKey: "hore_hotel_id"});
  hotels.hasMany(hotel_reviews, { as: "hotel_reviews", foreignKey: "hore_hotel_id"});
  facility_price_history.belongsTo(users, { as: "faph_user", foreignKey: "faph_user_id"});
  users.hasMany(facility_price_history, { as: "facility_price_histories", foreignKey: "faph_user_id"});
  hotel_reviews.belongsTo(users, { as: "hore_user", foreignKey: "hore_user_id"});
  users.hasMany(hotel_reviews, { as: "hotel_reviews", foreignKey: "hore_user_id"});
  employee_department_history.belongsTo(department, { as: "edhi_dept", foreignKey: "edhi_dept_id"});
  department.hasMany(employee_department_history, { as: "employee_department_histories", foreignKey: "edhi_dept_id"});
  employee.belongsTo(employee, { as: "emp_emp", foreignKey: "emp_emp_id"});
  employee.hasMany(employee, { as: "employees", foreignKey: "emp_emp_id"});
  employee_department_history.belongsTo(employee, { as: "edhi_emp", foreignKey: "edhi_emp_id"});
  employee.hasMany(employee_department_history, { as: "employee_department_histories", foreignKey: "edhi_emp_id"});
  employee_pay_history.belongsTo(employee, { as: "ephi_emp", foreignKey: "ephi_emp_id"});
  employee.hasMany(employee_pay_history, { as: "employee_pay_histories", foreignKey: "ephi_emp_id"});
  work_order_detail.belongsTo(employee, { as: "wode_emp", foreignKey: "wode_emp_id"});
  employee.hasMany(work_order_detail, { as: "work_order_details", foreignKey: "wode_emp_id"});
  work_order_detail.belongsTo(facilities, { as: "wode_faci", foreignKey: "wode_faci_id"});
  facilities.hasMany(work_order_detail, { as: "work_order_details", foreignKey: "wode_faci_id"});
  employee.belongsTo(job_role, { as: "emp_joro", foreignKey: "emp_joro_id"});
  job_role.hasMany(employee, { as: "employees", foreignKey: "emp_joro_id"});
  work_order_detail.belongsTo(service_task, { as: "wode_setum", foreignKey: "wode_seta_id"});
  service_task.hasMany(work_order_detail, { as: "work_order_details", foreignKey: "wode_seta_id"});
  employee_department_history.belongsTo(shift, { as: "edhi_shift", foreignKey: "edhi_shift_id"});
  shift.hasMany(employee_department_history, { as: "employee_department_histories", foreignKey: "edhi_shift_id"});
  work_orders.belongsTo(users, { as: "woro_user", foreignKey: "woro_user_id"});
  users.hasMany(work_orders, { as: "work_orders", foreignKey: "woro_user_id"});
  work_order_detail.belongsTo(work_orders, { as: "wode_woro", foreignKey: "wode_woro_id"});
  work_orders.hasMany(work_order_detail, { as: "work_order_details", foreignKey: "wode_woro_id"});
  policy_category_group.belongsTo(category_group, { as: "poca_cagro", foreignKey: "poca_cagro_id"});
  category_group.hasMany(policy_category_group, { as: "policy_category_groups", foreignKey: "poca_cagro_id"});
  address.belongsTo(city, { as: "addr_city", foreignKey: "addr_city_id"});
  city.hasMany(address, { as: "addresses", foreignKey: "addr_city_id"});
  provinces.belongsTo(country, { as: "prov_country", foreignKey: "prov_country_id"});
  country.hasMany(provinces, { as: "provinces", foreignKey: "prov_country_id"});
  policy_category_group.belongsTo(policy, { as: "poca_poli", foreignKey: "poca_poli_id"});
  policy.hasMany(policy_category_group, { as: "policy_category_groups", foreignKey: "poca_poli_id"});
  city.belongsTo(provinces, { as: "city_province", foreignKey: "city_province_id"});
  provinces.hasMany(city, { as: "cities", foreignKey: "city_province_id"});
  country.belongsTo(regions, { as: "country_region", foreignKey: "country_region_id"});
  regions.hasMany(country, { as: "countries", foreignKey: "country_region_id"});
  bank.belongsTo(entity, { as: "bank_entity", foreignKey: "bank_entity_id"});
  entity.hasOne(bank, { as: "bank", foreignKey: "bank_entity_id"});
  payment_gateway.belongsTo(entity, { as: "paga_entity", foreignKey: "paga_entity_id"});
  entity.hasOne(payment_gateway, { as: "payment_gateway", foreignKey: "paga_entity_id"});
  user_accounts.belongsTo(entity, { as: "usac_entity", foreignKey: "usac_entity_id"});
  entity.hasMany(user_accounts, { as: "user_accounts", foreignKey: "usac_entity_id"});
  payment_transaction.belongsTo(user_accounts, { as: "patr_source", foreignKey: "patr_source_id"});
  user_accounts.hasMany(payment_transaction, { as: "payment_transactions", foreignKey: "patr_source_id"});
  payment_transaction.belongsTo(user_accounts, { as: "patr_target", foreignKey: "patr_target_id"});
  user_accounts.hasMany(payment_transaction, { as: "patr_target_payment_transactions", foreignKey: "patr_target_id"});
  payment_transaction.belongsTo(users, { as: "patr_user", foreignKey: "patr_user_id"});
  users.hasMany(payment_transaction, { as: "payment_transactions", foreignKey: "patr_user_id"});
  user_accounts.belongsTo(users, { as: "usac_user", foreignKey: "usac_user_id"});
  users.hasMany(user_accounts, { as: "user_accounts", foreignKey: "usac_user_id"});
  purchase_order_header.belongsTo(employee, { as: "pohe_emp", foreignKey: "pohe_emp_id"});
  employee.hasMany(purchase_order_header, { as: "purchase_order_headers", foreignKey: "pohe_emp_id"});
  vendor.belongsTo(entity, { as: "vendor_entity", foreignKey: "vendor_entity_id"});
  entity.hasOne(vendor, { as: "vendor", foreignKey: "vendor_entity_id"});
  stock_detail.belongsTo(facilities, { as: "stod_faci", foreignKey: "stod_faci_id"});
  facilities.hasMany(stock_detail, { as: "stock_details", foreignKey: "stod_faci_id"});
  purchase_order_detail.belongsTo(purchase_order_header, { as: "pode_pohe", foreignKey: "pode_pohe_id"});
  purchase_order_header.hasMany(purchase_order_detail, { as: "purchase_order_details", foreignKey: "pode_pohe_id"});
  stock_detail.belongsTo(purchase_order_header, { as: "stod_pohe", foreignKey: "stod_pohe_id"});
  purchase_order_header.hasMany(stock_detail, { as: "stock_details", foreignKey: "stod_pohe_id"});
  purchase_order_detail.belongsTo(stocks, { as: "pode_stock", foreignKey: "pode_stock_id"});
  stocks.hasMany(purchase_order_detail, { as: "purchase_order_details", foreignKey: "pode_stock_id"});
  stock_detail.belongsTo(stocks, { as: "stod_stock", foreignKey: "stod_stock_id"});
  stocks.hasMany(stock_detail, { as: "stock_details", foreignKey: "stod_stock_id"});
  stock_photo.belongsTo(stocks, { as: "spho_stock", foreignKey: "spho_stock_id"});
  stocks.hasMany(stock_photo, { as: "stock_photos", foreignKey: "spho_stock_id"});
  vendor_product.belongsTo(stocks, { as: "vepro_stock", foreignKey: "vepro_stock_id"});
  stocks.hasMany(vendor_product, { as: "vendor_products", foreignKey: "vepro_stock_id"});
  purchase_order_header.belongsTo(vendor, { as: "pohe_vendor", foreignKey: "pohe_vendor_id"});
  vendor.hasMany(purchase_order_header, { as: "purchase_order_headers", foreignKey: "pohe_vendor_id"});
  vendor_product.belongsTo(vendor, { as: "vepro_vendor", foreignKey: "vepro_vendor_id"});
  vendor.hasMany(vendor_product, { as: "vendor_products", foreignKey: "vepro_vendor_id"});
  resto_menus.belongsTo(facilities, { as: "reme_faci", foreignKey: "reme_faci_id"});
  facilities.hasMany(resto_menus, { as: "resto_menus", foreignKey: "reme_faci_id"});
  order_menu_detail.belongsTo(order_menus, { as: "omde_orme", foreignKey: "omde_orme_id"});
  order_menus.hasMany(order_menu_detail, { as: "order_menu_details", foreignKey: "omde_orme_id"});
  order_menu_detail.belongsTo(resto_menus, { as: "omde_reme", foreignKey: "omde_reme_id"});
  resto_menus.hasMany(order_menu_detail, { as: "order_menu_details", foreignKey: "omde_reme_id"});
  resto_menu_photos.belongsTo(resto_menus, { as: "remp_reme", foreignKey: "remp_reme_id"});
  resto_menus.hasMany(resto_menu_photos, { as: "resto_menu_photos", foreignKey: "remp_reme_id"});
  order_menus.belongsTo(users, { as: "orme_user", foreignKey: "orme_user_id"});
  users.hasMany(order_menus, { as: "order_menus", foreignKey: "orme_user_id"});
  user_profiles.belongsTo(address, { as: "uspra_addr", foreignKey: "uspra_addr_id"});
  address.hasMany(user_profiles, { as: "user_profiles", foreignKey: "uspra_addr_id"});
  user_members.belongsTo(members, { as: "usme_memb_name_member", foreignKey: "usme_memb_name"});
  members.hasMany(user_members, { as: "user_members", foreignKey: "usme_memb_name"});
  user_roles.belongsTo(roles, { as: "usro_role", foreignKey: "usro_role_id"});
  roles.hasMany(user_roles, { as: "user_roles", foreignKey: "usro_role_id"});
  user_bonus_points.belongsTo(users, { as: "ubpo_user", foreignKey: "ubpo_user_id"});
  users.hasMany(user_bonus_points, { as: "user_bonus_points", foreignKey: "ubpo_user_id"});
  user_members.belongsTo(users, { as: "usme_user", foreignKey: "usme_user_id"});
  users.hasOne(user_members, { as: "user_member", foreignKey: "usme_user_id"});
  user_password.belongsTo(users, { as: "uspa_user", foreignKey: "uspa_user_id"});
  users.hasOne(user_password, { as: "user_password", foreignKey: "uspa_user_id"});
  user_profiles.belongsTo(users, { as: "uspro_user", foreignKey: "uspro_user_id"});
  users.hasMany(user_profiles, { as: "user_profiles", foreignKey: "uspro_user_id"});
  user_roles.belongsTo(users, { as: "usro_user", foreignKey: "usro_user_id"});
  users.hasMany(user_roles, { as: "user_roles", foreignKey: "usro_user_id"});

  return {
    address,
    bank,
    booking_order_detail,
    booking_order_detail_extra,
    booking_orders,
    category_group,
    city,
    country,
    department,
    employee,
    employee_department_history,
    employee_pay_history,
    entity,
    facilities,
    facility_photos,
    facility_price_history,
    hotel_reviews,
    hotels,
    job_role,
    joinmenu,
    members,
    order_menu_detail,
    order_menus,
    payment_gateway,
    payment_transaction,
    policy,
    policy_category_group,
    price_items,
    provinces,
    purchase_order_detail,
    purchase_order_header,
    regions,
    resto_menu_photos,
    resto_menus,
    roles,
    service_task,
    shift,
    special_offer_coupons,
    special_offers,
    stock_detail,
    stock_photo,
    stocks,
    user_accounts,
    user_bonus_points,
    user_breakfast,
    user_members,
    user_password,
    user_profiles,
    user_roles,
    users,
    vendor,
    vendor_product,
    work_order_detail,
    work_orders,
  };
}
const models = initModels(sequelize);
export default models;

export { sequelize };