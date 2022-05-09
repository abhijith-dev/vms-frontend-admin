const env = process.env

export const ENV = {
    API_BASE_URL : env.REACT_APP_API_BASE_URL,
    FETCH_ORDERS : '/report/list',
    ADD_FUEL : '/fuels/add',
    ADMIN_VERIFICATION : '/admin/verification',
    ADD_VEHICLES : '/vehicles/bulkCreate',
    FETCH_ALL_VEHICLES:'/vehicles/getAll',
    EDIT_VEHICLES:`/vehicles/update`,
    FETCH_CUSTOMER:'/users/all',
    ADD_DRIVERS:'/drivers/create',
    ADD_PROFILE_PICTURE:'/drivers/upload/profile',
    FETCH_ALL_DRIVERS:'/drivers/getAll',
    DELETE_DRIVER:'/drivers/delete',
    EDIT_DRIVER:'/drivers/update',
    MAPPING:'/mapping/create',
    FETCH_BOOKINGS:'/booking/all',
    FETCH_FUEL:'/fuels/getAll',
    FETCH_CHART_DATA:'/analytics/data',
    DOWNLOAD_FILE:'/report/download',
    DELETE_VEHICLE:'/vehicles/delete',
    FETCH_ALL_TRACKING_VEHICLES:'/tracking/vehicle',
    FETCH_ALL_CORDS:'/tracking/cords',
    TOTAL_BALANCE : '/admin/balance'
}