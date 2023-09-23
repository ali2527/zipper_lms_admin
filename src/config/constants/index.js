export const SITE_NAME = "Zipper LMS"

export const BASE_URL = "http://localhost:3002/api"
export const UPLOAD_URL = "http://localhost:3002/Uploads/"
export const UPLOAD_URL2 = "http://localhost:3002/"
export const SOCKET_URL = "http://localhost:3002"



// export const BASE_URL = "https://secure.demo243.webhostlabs.net:3002/api/"
// export const UPLOAD_URL = "https://secure.demo243.webhostlabs.net:3002/Uploads/"




export const AUTH = {
    signin: "/admin/auth/signin",
    logout: "/auth/logout",
    emailCode:"/admin/auth/emailVerificationCode",
    verifyCode:"/admin/auth/verifyRecoverCode",
    resetPassword:"/admin/auth/resetPassword",
  };

  
  export const NEWS = {
    getNewsFeed : "/post/getNewsFeeds",
    getUserPosts:"/post/getUserPosts/",
    likePost : "/post/likePost",
    lovePost: "/post/lovePost",
    commentPost:"/post/comment/",
    addPost:"/post/addPost"
}


export const RATES = {
  getMyRates: "/rates/getMyRates",
  getCoachRates:"/rates/getCoachRates/",
  setRates : "/rates/setRates"
}

export const COMISSSION = {
  getComission : "/comission/getComission",
  addComission:"/comission/addComission"
}

export const REVIEWS={
  getAll:"/review/getAllReviewsByCoachId/",
  getCoachRatings:"/review/getCoachRatings/"
}

export const SCHEDULE = {
  addSchedule: "/schedule/addSchedule",
  getMySchedule:"/schedule/getMySchedule",
  getScheduleByCoachId:"/schedule/getScheduleByCoachId/"
}

export const GALLERY = {
  addGallery:"/gallery/addGallery",
  getMyGallery: "/gallery/getMyGallery/",
  getAllGallery:"/gallery/getAllGallery"
}

export const CONTEST = {
  addContest:"/admin/contests/createContest",
  getAllContests:"/admin/contests/getAllContests",
  getAllContestEntries:"/admin/entries/getAllContestEntries/",
  getOne:"/admin/contests/getContestById/",
  updateContest:"/admin/contests/updateContest/",
  deleteContest:"/admin/contests/deleteContest/",
  selectWinner:"/admin/contests/selectWinner"
}

  export const ADMIN = {
    updateProfile: "/profile/updateProfile",
  };

  export const USERS = {
    getAllStudents: "/admin/user/getAllStudents",
    getStudentById: "/admin/user/getStudentById/",
    toggleStatus: "/admin/user/toggleStatus/",
  };

  export const LESSON = {
    getAllUpcomingLessons: "/admin/lesson/getAllUpcomingLessons",
    getAllCompletedLessons: "/admin/lesson/getAllCompletedLessons",
    getAllPendingLessons: "/admin/lesson/getAllPendingLessons",
    getAllLiveLessons: "/admin/lesson/getAllLiveLessons",
    getAllRejectedLessons: "/admin/lesson/getAllRejectedLessons",
    getAllMissedLessons: "/admin/lesson/getAllMissedLessons",
    getLessonById: "/admin/lesson/getLessonById/",
    deleteLesson: "/admin/lesson/deleteLesson/",
    getLessonsByMonth:"/admin/lesson/getLessonsByMonth"
  };


  export const COACH = {
    getAllTutorAndCoaches: "/admin/user/getAllTutorAndCoaches",
    getCoachById: "/admin/user/getCoachById/",
    toggleStatus: "/admin/user/toggleStatus/",
  };
  export const SERVICE_PROVIDERS = {
    get: "/users/admin/serviceProvider",
    getOne: "/users/getSpById/",
    toggleStatus: "/users/toggleActiveInActive",
  };

  export const CATEGORIES = {
    get: "/category/GetAllCategoriesNew",
    getOne: "/category/admin/",
    toggleStatus: "/category/toggleActiveInActive",
    edit:"/category/edit/",
  };

  export const FEEDBACK = {
    get: "/contact",
    getOne: "/contact/feedbackById/",
  };


  export const SUBSCRIPTION = {
    get: "/plan/getAllPlans",
    create:"/plan/addPlan",
    getOne: "/plan/getPlanById/",
    edit: "/plan/editPlan/",
    delete: "/plan/deletePlan/",
  };


  export const PAYMENT = {
    get: "/payment/getAllPayments",
    getOne: "/payment/",
    getAllSubscriptionPayments:"/admin/payment/getAllSubscriptionPayments",
    getAllContestPayments:"/admin/payment/getAllContestPayments"
  };

  export const NOTIFICATION = {
    get: "/notification/getAllNotifications",
    getOne: "/notification/getNotificationById/",
    create: "/notification/createAlertOrAnnoucement",
    sendPushNotification:"/notification/sendPushNotification",
    getAllAdminNotifications:"/notification/getAllAdminNotifications",
    getUnreadAdminNotifications:"/notification/getUnreadAdminNotifications",
    toggleNotification:"/notification/toggleNotification/"
  };
  
  export const QUERY = {
    get: "/query/getAllQueries",
    getOne: "/query/getQueryById/",
  };

  export const ARTICLE = {
    get: "/article/getAllArticles",
    getOne: "/article/getArticleById/",
    add: "/article/addArticle",
    edit: "/article/updateArticle/",
    delete:"/article/deleteArticle/",
  };


  export const ARTICLECATEGORIES = {
    get: "/articleCategory/getAllArticleCategories",
    getOne: "/articleCategory/getArticleCategoryById/",
    add: "/articleCategory/addArticleCategory",
    edit: "/articleCategory/updateArticleCategory/",
    delete:"/articleCategory/deleteArticelCategory/",
  };


  export const CONTENT_TYPE = {
    JSON: "application/json",
    FORM_DATA: "multipart/form-data",
}