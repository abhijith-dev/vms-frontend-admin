const env = process.env

export const ENV = {
    API_BASE_URL : env.REACT_APP_API_BASE_URL,
    FETCH_ORDERS : '/report/list',
    ADD_FUEL : '/fuel/add',
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
    MAPPING:'/mapping/create'
}