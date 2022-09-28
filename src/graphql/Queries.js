import { gql } from '@apollo/client';

export const SIGNUP = gql`
  mutation CreateUser($user: UserInput) {
    CreateUser(user: $user) {
      status
      message
    }
  }
`;

export const UPDATE_LAST_SEEN = gql`
  mutation UserLastSeen($date: String) {
    UserLastSeen(date: $date) {
      status
      message
    }
  }
`;

export const LOGIN = gql`
  mutation login($userName: String, $password: String) {
    login(userName: $userName, password: $password) {
      token
      error
      user {
        id
        firstName
        lastName
        lastSeen
        email
        cover
        avatarUrl
        description
        phoneNumber
        isBusiness
        isVerified
        address
        address2
        city
        country
        postalCode
        businessNumber
        businessName
        mobileNotifications
        emailNotifications
        responseRate
        responseTime
        hostLevel
        licenseType
        favorites {
          id
          make
          model
          images {
            id
            url
          }
        }
      }
    }
  }
`;

export const SEND_REPORT = gql`
  mutation SendReport($id: ID, $reason: String, $description: String) {
    SendReport(id: $id, reason: $reason, description: $description) {
      status
      message
    }
  }
`;

export const GET_USERS = gql`
  {
    allUsers {
      id
      userName
    }
  }
`;

export const GET_CURRENT_USER = gql`
  {
    GetCurrentUser {
      id
      userName
      firstName
      lastName
      lastSeen
      email
      avatarUrl
      description
      cover
      phoneNumber
      isBusiness
      isVerified
      address
      address2
      city
      country
      postalCode
      businessNumber
      businessName
      mobileNotifications
      emailNotifications
      responseRate
      responseTime
      hostLevel
      license
      licenseType
      checkInCode
      accountStatus
      profileComplete
      defaultCard
      favorites {
        id
        make
        model
        images {
          id
          url
        }
      }
    }
  }
`;

export const GET_CURRENT_USER_DOCUMENTS = gql`
  {
    getUserDocuments {
      id
      status
      type
      url
    }
  }
`;

export const GET_USER_EARNINGS = gql`
  {
    GetUserEarnings {
      id
      date
      amount
      fee
      status
      paymentStatus
      clientSecret
      paymentIntentId
      booking {
        id
        earning
        startTime
        endTime
        declineReason
        isAccepted
        isDeclined
        isCancelled
        isLateReturn
        isCheckInComplete
        isCheckOutComplete
      }
      sender {
        id
        userName
        firstName
        lastName
        lastSeen
        email
        avatarUrl
        description
        cover
        phoneNumber
        isBusiness
        isVerified
        address
        address2
        city
        country
        postalCode
        businessNumber
        businessName
      }
      receiver {
        id
        userName
        firstName
        lastName
        lastSeen
        email
        avatarUrl
        description
        cover
        phoneNumber
        isBusiness
        isVerified
        address
        address2
        city
        country
        postalCode
        businessNumber
        businessName
      }
      vehicle {
        id
        make
        model
        reg
        images {
          id
          url
        }
        vehicleType
      }
    }
  }
`;

export const GET_USER_SUMMARY = gql`
  {
    GetUserSummary {
      earnings {
        id
        amount
        bookingId
        VehicleType
        date
      }
      bookings {
        id
        status
        VehicleType
        date
      }
    }
  }
`;

export const GET_USER_CARDS = gql`
  {
    RetrieveUserCards {
      id
      created
      type
      livemode
      card {
        id
        brand
        country
        description
        expMonth
        expYear
        issuer
        last4
      }
    }
  }
`;

export const GET_USER_NOTIFICATIONS = gql`
  {
    GetUserNotifications {
      id
      message
      isRead
      url
      date
    }
  }
`;

export const GET_USER_SUMMARY_EARNINGS = gql`
  {
    GetUserSummaryEarning {
      id
      amount
      fee
      bookingId
      vehicleId
      status
      VehicleType
      date
    }
  }
`;

export const GET_USER_SUMMARY_TRIPS = gql`
  {
    GetUserSummaryTrips {
      id
      status
      VehicleType
      date
      vehicleId
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUserInfo($user: UserInput) {
    UpdateUserInfo(user: $user) {
      id
      firstName
      lastName
      lastSeen
      email
    }
  }
`;

export const DEACTIVATE_ACCOUNT = gql`
  mutation DeactivateUser {
    DeactivateUser {
      status
      message
    }
  }
`;

export const UPLOAD_DOCUMENTS = gql`
  mutation AddDocuments($documents: [DocumentsInput]) {
    AddDocuments(documents: $documents) {
      status
      message
    }
  }
`;

export const UPLOAD_DOCUMENT = gql`
  mutation AddDocument($document: DocumentsInput) {
    AddDocument(document: $document) {
      status
      message
    }
  }
`;

export const CREATE_SETUP_INTEND = gql`
  mutation CreateSetUpIntent {
    CreateSetUpIntent {
      status
      message
    }
  }
`;

export const READ_NOTIFICATION = gql`
  mutation ReadNotification($notificationID: ID) {
    ReadNotification(notificationID: $notificationID) {
      status
      message
    }
  }
`;

export const SEND_EMAIL_VERIFICATION = gql`
  mutation CreateMailVerification($userName: String) {
    CreateMailVerification(userName: $userName) {
      status
      message
    }
  }
`;

export const EMAIL_VERIFICATION = gql`
  mutation VerifyEmail($token: String) {
    VerifyEmail(token: $token) {
      status
      message
    }
  }
`;

export const SEND_CREATE_FORGOT_PASSWORD = gql`
  mutation CreateForgotPassword($userName: String) {
    CreateForgotPassword(userName: $userName) {
      status
      message
    }
  }
`;

export const UPDATE_EMAIL = gql`
  mutation CreateNewEmail($updateEmail: UpdateEmail) {
    CreateNewEmail(updateEmail: $updateEmail) {
      status
      message
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation CreateNewPassword($updatePassword: UpdatePassword) {
    CreateNewPassword(updatePassword: $updatePassword) {
      status
      message
    }
  }
`;

export const PASSWORD_VERIFICATION = gql`
  mutation VerifyNewPassword($token: String) {
    VerifyNewPassword(token: $token) {
      status
      message
    }
  }
`;

export const UPDATE_PHONE_NUMBER = gql`
  mutation CreateNewNumber($number: String) {
    CreateNewNumber(number: $number) {
      status
      message
    }
  }
`;

export const PHONE_NUMBER_VERIFICATION = gql`
  mutation VerifyNewNumber($token: String) {
    VerifyNewNumber(token: $token) {
      status
      message
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    GetUserByEmail(email: $email) {
      id
      userName
      firstName
      lastName
      lastSeen
      email
      cover
      avatarUrl
      phoneNumber
      isBusiness
      isVerified
      address
      address2
      city
      country
    }
  }
`;

export const GET_USER_PROFILE_BY_ID = gql`
  query userProfileById($id: ID!) {
    userProfileById(id: $id) {
      id
      isBusiness
      isUser
      firstName
      lastName
      userName
      businessName
      businessNumber
      avatarUrl
      cover
      quote
      gender
      title
      description
      lastSeen
      isVerified
      responseRate
      responseTime
      hostLevel
      bookingReviews {
        id
        communicationRating
        vehicleRating
        experienceRating
        comment
        postedAt
        user {
          id
        }
      }
      vehicles {
        id
        name
        reg
        vehicleType
        make
        model
        fuelType
        year
        mileage
        hourlyRates
        dailyRates
        freeCancellation
        cancellationPercentage
        cancellationDescription
        description
        status
        images {
          id
          url
        }
      }
      reviews {
        id
        Head
        comment
        rating
        postedAt
        user {
          id
          email
          firstName
          lastName
          lastSeen
          avatarUrl
        }
      }
    }
  }
`;

export const GET_USER_REVIEWS_BY_ID = gql`
  query GetUserByIdReviews($id: ID!) {
    GetUserByIdReviews(id: $id) {
      id
      communicationRating
      vehicleRating
      experienceRating
      comment
      postedAt
      user {
        id
        userName
        firstName
        lastName
        lastSeen
        email
        avatarUrl
        description
        cover
        phoneNumber
        isBusiness
        isVerified
        address
        address2
        city
        country
        postalCode
        businessNumber
        businessName
        mobileNotifications
        emailNotifications
      }
      userTo {
        id
        userName
        firstName
        lastName
        lastSeen
        email
        avatarUrl
        description
        cover
        phoneNumber
        isBusiness
        isVerified
        address
        address2
        city
        country
        postalCode
        businessNumber
        businessName
        mobileNotifications
        emailNotifications
      }
    }
  }
`;

export const GET_VEHICLE_REVIEWS_BY_ID = gql`
  query GetVehicleByIdReviews($id: ID!) {
    GetVehicleByIdReviews(id: $id) {
      id
      communicationRating
      vehicleRating
      experienceRating
      comment
      postedAt
      user {
        id
        userName
        firstName
        lastName
        lastSeen
        email
        avatarUrl
        description
        cover
        phoneNumber
        isBusiness
        isVerified
        address
        address2
        city
        country
        postalCode
        businessNumber
        businessName
        mobileNotifications
        emailNotifications
      }
      userTo {
        id
        userName
        firstName
        lastName
        lastSeen
        email
        avatarUrl
        description
        cover
        phoneNumber
        isBusiness
        isVerified
        address
        address2
        city
        country
        postalCode
        businessNumber
        businessName
        mobileNotifications
        emailNotifications
      }
    }
  }
`;

export const GET_USER_VEHICLES_BY_ID = gql`
  query GetUserByIdVehicles($id: ID!) {
    GetUserByIdVehicles(id: $id) {
      id
      name
      reg
      vehicleType
      description
      make
      model
      fuelType
      year
      mileage
      hourlyRates
      dailyRates
      description
      status
      availability {
        id
        timeType
        label
        dayStart
        dayEnd
      }
      images {
        id
        url
      }
    }
  }
`;

export const CREATE_STAFF_MEMBER = gql`
  mutation CreateStaff($userName: String, $companyRoleGroup: CompanyRoleGroupInput) {
    CreateStaff(userName: $userName, companyRoleGroup: $companyRoleGroup) {
      user {
        id
        firstName
        lastName
        lastSeen
        email
        cover
        phoneNumber
        isBusiness
        isVerified
        address
        address2
        city
      }
      company {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const EDIT_STAFF_MEMBER = gql`
  mutation EditStaff($id: ID, $companyRoleGroup: CompanyRoleGroupInput) {
    EditStaff(id: $id, companyRoleGroup: $companyRoleGroup) {
      user {
        id
        firstName
        lastName
        lastSeen
        email
        cover
        phoneNumber
        isBusiness
        isVerified
        address
        address2
        city
      }
      company {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const DELETE_STAFF_MEMBER = gql`
  mutation DeleteStaff($id: ID) {
    DeleteStaff(id: $id) {
      status
      message
    }
  }
`;

export const DELETE_VEHICLE = gql`
  mutation DeleteVehicle($vehicleId: ID) {
    DeleteVehicle(vehicleId: $vehicleId) {
      status
      message
    }
  }
`;

export const GET_STAFF_MEMBERS = gql`
  {
    GetStaffMembers {
      id
      roleGroup {
        id
        name
        roles {
          id
          name
        }
      }
      user {
        id
        firstName
        lastName
        email
        cover
        avatarUrl
        phoneNumber
        isBusiness
        isVerified
        address
        address2
        city
      }
      company {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const GET_GROUP_ROLES = gql`
  {
    GetRoleGroups {
      id
      name
      roles {
        id
        name
      }
    }
  }
`;

export const GET_USER_CONTACTS = gql`
  {
    GetUserContacts {
      id
      unreadCount
      lastActivity {
        id
        userId
        message
        date
        unread
        read
      }
      status
      position
      lastMessage
      type
      owner1 {
        id
        userName
        firstName
        lastName
        lastSeen
        email
        cover
        phoneNumber
        isBusiness
        isVerified
        address
        address2
      }
      owner2 {
        id
        userName
        firstName
        lastName
        lastSeen
        email
        cover
        phoneNumber
        isBusiness
        isVerified
        address
        address2
      }
      bookings {
        id
        earning
        startTime
        endTime
        declineReason
        isAccepted
        isDeclined
        isCancelled
        isLateReturn
        isCheckInComplete
        isCheckOutComplete
        lender {
          id
          email
          firstName
          lastName
          lastSeen
          avatarUrl
        }
        borrower {
          id
          email
          firstName
          lastName
          lastSeen
          avatarUrl
        }
        vehicleRented {
          id
          name
          reg
          vehicleType
          make
          model
          fuelType
          year
          mileage
          hourlyRates
          dailyRates
          freeCancellation
          cancellationPercentage
          cancellationDescription
          description
          status
          user {
            id
            email
            firstName
            lastName
            lastSeen
            avatarUrl
          }
          location {
            id
            address
            city
            area
            state
            placeId
            lat
            lng
          }
          features {
            id
            name
          }
          images {
            id
            url
          }
        }
      }
    }
  }
`;

export const GET_USER_BOOKING_CONTACTS = gql`
  {
    GetUserBookingContacts {
      id
      unreadCount
      lastActivity {
        id
        userId
        message
        date
        unread
        read
      }
      status
      position
      lastMessage
      type
      owner1 {
        id
        userName
        firstName
        lastName
        lastSeen
        email
        cover
        phoneNumber
        isBusiness
        isVerified
        address
        address2
      }
      owner2 {
        id
        userName
        firstName
        lastName
        lastSeen
        email
        cover
        phoneNumber
        isBusiness
        isVerified
        address
        address2
      }
      bookings {
        id
        earning
        startTime
        endTime
        declineReason
        isAccepted
        isDeclined
        isCancelled
        isLateReturn
        isCheckInComplete
        isCheckOutComplete
        lender {
          id
          email
          firstName
          lastName
          lastSeen
          avatarUrl
        }
        borrower {
          id
          email
          firstName
          lastName
          lastSeen
          avatarUrl
        }
        vehicleRented {
          id
          name
          reg
          vehicleType
          make
          model
          fuelType
          year
          mileage
          hourlyRates
          dailyRates
          freeCancellation
          cancellationPercentage
          cancellationDescription
          description
          status
          user {
            id
            email
            firstName
            lastName
            lastSeen
            avatarUrl
          }
          location {
            id
            address
            city
            area
            state
            placeId
            lat
            lng
          }
          features {
            id
            name
          }
          images {
            id
            url
          }
        }
      }
    }
  }
`;

export const GET_USER_CONTACT_BY_ID = gql`
  query GetUserContactById($id: ID!) {
    GetUserContactById(id: $id) {
      id
      unreadCount
      status
      position
      lastMessage
      type
      owner1 {
        id
        userName
        firstName
        lastName
        lastSeen
        email
        cover
        phoneNumber
        isBusiness
        isVerified
        address
        address2
      }
      owner2 {
        id
        userName
        firstName
        lastName
        lastSeen
        email
        cover
        phoneNumber
        isBusiness
        isVerified
        address
        address2
      }
      lastActivity {
        id
        userId
        message
        date
        unread
        read
      }
      bookings {
        id
        earning
        startTime
        endTime
        declineReason
        isAccepted
        isDeclined
        isCancelled
        isLateReturn
        isCheckInComplete
        isCheckOutComplete
        lender {
          id
          email
          firstName
          lastName
          lastSeen
          avatarUrl
        }
        borrower {
          id
          email
          firstName
          lastName
          lastSeen
          avatarUrl
        }
        vehicleRented {
          id
          name
          reg
          vehicleType
          make
          model
          fuelType
          year
          mileage
          hourlyRates
          dailyRates
          freeCancellation
          cancellationPercentage
          cancellationDescription
          description
          status
          images {
            id
            url
          }
        }
      }
      vehicles {
        id
        name
        reg
        vehicleType
        make
        model
        fuelType
        year
        mileage
        hourlyRates
        dailyRates
        freeCancellation
        cancellationPercentage
        cancellationDescription
        description
        status
        images {
          id
          url
        }
      }
    }
  }
`;

export const GET_USER_BOOKING_BY_ID = gql`
  query BookingById($id: ID!) {
    BookingById(id: $id) {
      id
      earning
      startTime
      endTime
      declineReason
      paymentStatus
      isAccepted
      isDeclined
      isCancelled
      isLateReturn
      isCheckInComplete
      isCheckOutComplete
      bookingActivities {
        id
        name
        description
        date
      }
      bookingReviews {
        id
        communicationRating
        vehicleRating
        experienceRating
        comment
        postedAt
        user {
          id
        }
      }
      messages {
        id
        body
        contentType
        createdAt
        bookingChangeRequest {
          id
          isAccepted
          isDeclined
          declineReason
          startTime
          endTime
        }
        sender {
          id
          firstName
          lastName
          lastSeen
          email
        }
        receiver {
          id
          firstName
          lastName
          lastSeen
          email
        }
        breakDown {
          id
          reason
          description
          images {
            id
            url
          }
        }
        bookingReview {
          id
          communicationRating
          vehicleRating
          experienceRating
          comment
          postedAt
          user {
            id
          }
        }
      }
      lender {
        id
        email
        firstName
        lastName
        lastSeen
        avatarUrl
      }
      borrower {
        id
        email
        firstName
        lastName
        lastSeen
        avatarUrl
      }
      vehicleRented {
        id
        name
        reg
        vehicleType
        make
        model
        fuelType
        year
        mileage
        hourlyRates
        dailyRates
        status
        images {
          id
          url
        }
        freeCancellation
        cancellationPercentage
        cancellationDescription
      }
    }
  }
`;

export const GET_USER_CONTACT_BY_ID_S = gql`
  subscription GetUserContactById($id: ID!) {
    GetUserContactById(id: $id) {
      id
      unreadCount
      lastActivity {
        id
        userId
        message
        date
        unread
        read
      }
      status
      position
      lastMessage
      type
      messages {
        id
        body
        contentType
        createdAt
        attachments {
          id
          url
        }
        booking {
          id
          earning
          startTime
          endTime
          isCancelled
          isLateReturn
          isCheckInComplete
          isCheckOutComplete
          vehicleRented {
            id
            name
            reg
            vehicleType
            description
            make
            model
            fuelType
            year
            mileage
            hourlyRates
            dailyRates
            freeCancellation
            cancellationPercentage
            cancellationDescription
            description
            status
            user {
              id
              email
              firstName
              lastName
              lastSeen
              avatarUrl
            }
            location {
              id
              address
              city
              area
              state
              placeId
              lat
              lng
            }
            features {
              id
              name
            }
            images {
              id
              url
            }
          }
        }
        sender {
          id
          userName
          firstName
          lastName
          lastSeen
          email
          cover
          phoneNumber
          isBusiness
          isVerified
          address
          address2
        }
        receiver {
          id
          userName
          firstName
          lastName
          lastSeen
          email
          cover
          phoneNumber
          isBusiness
          isVerified
          address
          address2
        }
      }
      owner1 {
        id
        userName
        firstName
        lastName
        lastSeen
        email
        cover
        phoneNumber
        isBusiness
        isVerified
        address
        address2
      }
      owner2 {
        id
        userName
        firstName
        lastName
        lastSeen
        email
        cover
        phoneNumber
        isBusiness
        isVerified
        address
        address2
      }
    }
  }
`;

export const SEND_PARTNERSHIP_MESSAGE = gql`
  mutation SendPartnershipEmail($content: PartnershipEmailContent) {
    SendPartnershipEmail(content: $content) {
      status
      message
    }
  }
`;

export const SEND_CONTACT_US_MESSAGE = gql`
  mutation SendContactUsEmail($content: ContactUsEmailContent) {
    SendContactUsEmail(content: $content) {
      status
      message
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendBookingMessage($bookingID: ID, $message: MessageInput) {
    SendBookingMessage(bookingID: $bookingID, message: $message) {
      status
      message
    }
  }
`;

export const GET_USER_MESSAGE_CONTACTS = gql`
  {
    GetUserMessageContacts {
      id
      unreadCount
      lastActivity {
        id
        userId
        message
        date
        unread
        read
      }
      status
      position
      lastMessage
      type
      owner1 {
        id
        userName
        firstName
        lastName
        lastSeen
        email
        cover
        phoneNumber
        isBusiness
        isVerified
        address
        address2
      }
      owner2 {
        id
        userName
        firstName
        lastName
        lastSeen
        email
        cover
        phoneNumber
        isBusiness
        isVerified
        address
        address2
      }
    }
  }
`;

export const CREATE_VEHICLE_CONTACT = gql`
  mutation CreateVehicleContact($vehicleID: ID) {
    CreateVehicleContact(vehicleID: $vehicleID) {
      id
    }
  }
`;

export const SEND_MESSAGE_CONTACT = gql`
  mutation SendMessage($contactID: ID, $vehicleID: ID, $message: MessageInput) {
    SendMessage(contactID: $contactID, vehicleID: $vehicleID, message: $message) {
      status
      message
    }
  }
`;

export const SEND_VEHICLE_QUESTION = gql`
  mutation SendQuestion($vehicleID: ID, $comment: String, $date: String) {
    SendQuestion(vehicleID: $vehicleID, comment: $comment, date: $date) {
      status
      message
    }
  }
`;

export const SEND_VEHICLE_QUESTION_WITH_PARENT = gql`
  mutation SendQuestionWithParent($vehicleID: ID, $parentID: ID, $comment: String, $date: String) {
    SendQuestionWithParent(vehicleID: $vehicleID, parentID: $parentID, comment: $comment, date: $date) {
      status
      message
    }
  }
`;

export const GET_USER_VEHICLE_MESSAGES = gql`
  query GetContactVehicleMessages($contactId: ID, $vehicleId: ID) {
    GetContactVehicleMessages(contactId: $contactId, vehicleId: $vehicleId) {
      id
      body
      contentType
      createdAt
      sender {
        id
        firstName
        lastName
        lastSeen
        email
      }
      receiver {
        id
        firstName
        lastName
        lastSeen
        email
      }
    }
  }
`;

export const REGISTER_VEHICLE = gql`
  mutation CreateVehicle($vehicle: VehicleInput) {
    CreateVehicle(vehicle: $vehicle) {
      status
      message
    }
  }
`;

export const SET_VEHICLE_STATUS = gql`
  mutation SetVehicleStatus($id: ID, $status: Boolean) {
    SetVehicleStatus(id: $id, status: $status) {
      status
      message
    }
  }
`;

export const GET_VEHICLES = gql`
  {
    Vehicles {
      id
      name
      reg
      vehicleType
      description
      make
      model
      fuelType
      year
      mileage
      hourlyRates
      dailyRates
      description
      status
      licenseType
      availability {
        id
        timeType
        label
        dayStart
        dayEnd
      }
      features {
        id
        name
      }
      images {
        id
        url
      }
      location {
        id
        address
        city
        area
        state
        placeId
        lat
        lng
      }
    }
  }
`;

export const GET_VEHICLE_BY_ID = gql`
  query VehicleById($id: ID) {
    VehicleById(id: $id) {
      id
      name
      reg
      vehicleType
      description
      make
      model
      fuelType
      year
      mileage
      mileageRates
      description
      hourlyRates
      pastHourlyRates
      dailyRates
      pastDailyRates
      freeCancellation
      isFixedPrice
      cancellationPercentage
      cancellationDescription
      status
      licenseType
      user {
        id
        email
        firstName
        lastName
        lastSeen
        avatarUrl
        userName
      }
      location {
        id
        address
        city
        area
        state
        placeId
        lat
        lng
      }
      reviews {
        id
        Head
        comment
        rating
        postedAt
        user {
          id
          email
          firstName
          lastName
          lastSeen
          avatarUrl
        }
      }
      features {
        id
        name
      }
      availability {
        id
        timeType
        label
        dayStart
        dayEnd
      }
      images {
        id
        url
      }
    }
  }
`;

export const GET_VEHICLES_IN_RANGE = gql`
  query VehiclesWithInRange($lng: Float, $lat: Float, $radius: Int) {
    VehiclesWithInRange(lng: $lng, lat: $lat, radius: $radius) {
      id
      name
      reg
      vehicleType
      description
      make
      model
      fuelType
      year
      mileage
      hourlyRates
      dailyRates
      description
      status
      licenseType
      availability {
        id
        timeType
        label
        dayStart
        dayEnd
      }
      features {
        id
        name
      }
      images {
        id
        url
      }
      location {
        id
        address
        city
        area
        state
        placeId
        lat
        lng
      }
    }
  }
`;

export const GET_VEHICLE_QUESTION = gql`
  query GetVehicleQuestions($id: ID) {
    GetVehicleQuestions(id: $id) {
      id
      comment
      date
      sender {
        id
        email
        firstName
        lastName
        lastSeen
        avatarUrl
      }
      vehicle {
        id
        name
        reg
        vehicleType
        make
        model
      }
      children {
        id
        comment
        date
      }
    }
  }
`;

export const VEHICLE_ADD_TO_FAVOURITES = gql`
  mutation AddFavoritesToUser($vehicleID: ID) {
    AddFavoritesToUser(vehicleID: $vehicleID) {
      status
      message
    }
  }
`;

export const CREATE_SPECIFIC_DATE_AVAILABILITY = gql`
  mutation CreateSpecificDate($vehicleId: ID, $specificDate: AvailabilityInput) {
    CreateSpecificDate(vehicleId: $vehicleId, specificDate: $specificDate) {
      status
      message
    }
  }
`;

export const VEHICLE_REMOVE_FROM_FAVOURITES = gql`
  mutation RemoveFavoritesFromUser($vehicleID: ID) {
    RemoveFavoritesFromUser(vehicleID: $vehicleID) {
      status
      message
    }
  }
`;

export const GET_VEHICLE_DETAILS = gql`
  query VehicleDetailsByReg($reg: String) {
    VehicleDetailsByReg(reg: $reg) {
      Fuel
      Year
      Make
      Model
      Colour
      WheelPlan
      Taxed
    }
  }
`;

export const GET_USER_FAVORITES = gql`
  {
    GetUserFavorites {
      id
      name
      reg
      vehicleType
      description
      make
      model
      fuelType
      year
      mileage
      hourlyRates
      dailyRates
      description
      status
      user {
        id
        email
        firstName
        lastName
        lastSeen
        avatarUrl
      }
      location {
        id
        address
        city
        area
        state
        placeId
        lat
        lng
      }
      reviews {
        id
        Head
        comment
        rating
        postedAt
        user {
          id
          email
          firstName
          lastName
          lastSeen
          avatarUrl
        }
      }
      features {
        id
        name
      }
      availability {
        id
        timeType
        label
        dayStart
        dayEnd
      }
      images {
        id
        url
      }
    }
  }
`;

export const GET_USER_VEHICLES = gql`
  {
    GetUserVehicles {
      id
      name
      reg
      vehicleType
      description
      make
      model
      fuelType
      year
      mileage
      mileageRates
      hourlyRates
      pastHourlyRates
      dailyRates
      pastDailyRates
      isDraft
      description
      status
      licenseType
      bikeType
      bodyType
      gearBox
      freeCancellation
      isFixedPrice
      cancellationPercentage
      cancellationDescription
      features {
        id
        name
      }
      location {
        id
        address
        city
        area
        state
        placeId
        lat
        lng
      }
      availability {
        id
        timeType
        label
        dayStart
        dayEnd
      }
      availableSpecificDates {
        id
        date
        timeType
        label
        dayStart
        dayEnd
      }
      images {
        id
        url
      }
    }
  }
`;

export const GET_USER_CARDS_1 = gql`
  {
    GetCards {
      id
      cardName
      cardNumber
      cardExpired
      cardCvv
      cardType
    }
  }
`;

export const CREATE_PAYMENT_CARD = gql`
  mutation CreateCard($paymentCard: PaymentCardInput) {
    CreateCard(paymentCard: $paymentCard) {
      cardName
      cardNumber
    }
  }
`;

export const CREATE_BOOKING = gql`
  mutation CreateBooking($bookingRequest: BookingRequest) {
    CreateBooking(bookingRequest: $bookingRequest) {
      booking {
        id
        clientSecret
        startTime
        endTime
        paypalLink
        vehicleRented {
          id
          name
          reg
          vehicleType
          description
          make
          model
          fuelType
          year
          mileage
          hourlyRates
          dailyRates
          description
          status
          user {
            id
            email
            firstName
            lastName
            lastSeen
            avatarUrl
          }
          location {
            id
            address
            city
            area
            state
            placeId
            lat
            lng
          }
          reviews {
            id
            Head
            comment
            rating
            postedAt
            user {
              id
              email
              firstName
              lastName
              lastSeen
              avatarUrl
            }
          }
          features {
            id
            name
          }
          availability {
            id
            timeType
            label
            dayStart
            dayEnd
          }
          images {
            id
            url
          }
        }
      }
      contact {
        id
      }
    }
  }
`;

export const ACCEPT_BOOKING = gql`
  mutation AcceptBooking($bookingID: ID) {
    AcceptBooking(bookingID: $bookingID) {
      id
    }
  }
`;

export const DECLINE_BOOKING = gql`
  mutation DeclineBooking($bookingID: ID, $reason: String) {
    DeclineBooking(bookingID: $bookingID, reason: $reason) {
      id
    }
  }
`;

export const START_TRIP = gql`
  mutation CheckIn($bookingID: ID) {
    CheckIn(bookingID: $bookingID) {
      id
    }
  }
`;

export const END_TRIP = gql`
  mutation CheckOut($bookingID: ID) {
    CheckOut(bookingID: $bookingID) {
      id
    }
  }
`;

export const BOOKING_REVIEW = gql`
  mutation CreateBookingReview($bookingID: ID, $review: BookingReviewInput) {
    CreateBookingReview(bookingID: $bookingID, review: $review) {
      id
    }
  }
`;

export const VEHICLE_BREAKDOWN = gql`
  mutation CreateBreakDown($bookingID: ID, $newBreakDown: BreakDownInput) {
    CreateBreakDown(bookingID: $bookingID, newBreakDown: $newBreakDown) {
      id
    }
  }
`;

export const CANCEL_BOOKING = gql`
  mutation CancelBooking($bookingID: ID, $reason: String, $description: String) {
    CancelBooking(bookingID: $bookingID, reason: $reason, description: $description) {
      id
    }
  }
`;

export const BOOKING_REQUEST_CHANGE_EARNING = gql`
  query GetBookingChangeRequestEarning($id: ID) {
    GetBookingChangeRequestEarning(id: $id) {
      id
      date
      amount
      fee
      status
      paymentStatus
      clientSecret
      paymentIntentId
    }
  }
`;

export const REQUEST_BOOKING_CHANGE = gql`
  mutation RequestBookingChange($bookingID: ID, $startTime: String, $endTime: String, $amount: Float, $fee: Float) {
    RequestBookingChange(bookingID: $bookingID, startTime: $startTime, endTime: $endTime, amount: $amount, fee: $fee) {
      id
    }
  }
`;

export const ACCEPT_BOOKING_CHANGE = gql`
  mutation AcceptBookingChange($bookingChangeID: ID) {
    AcceptBookingChange(bookingChangeID: $bookingChangeID) {
      id
    }
  }
`;

export const DECLINE_BOOKING_CHANGE = gql`
  mutation DeclineBookingChange($bookingChangeID: ID, $reason: String) {
    DeclineBookingChange(bookingChangeID: $bookingChangeID, reason: $reason) {
      id
    }
  }
`;

export const NOTIFICATIONS_SUBSCRIPTION = gql`
  subscription GetNotifications($id: ID) {
    GetNotifications(id: $id) {
      id
      isRead
      message
      url
      date
      notificationType
      contactID
      contactItemID
    }
  }
`;

export const MESSAGES_SUBSCRIPTION = gql`
  subscription GetMessageContacts($id: ID, $type: String) {
    GetMessageContacts(id: $id, type: $type) {
      id
      lastActivity {
        id
        read
      }
      owner1 {
        id
        firstName
        lastName
        avatarUrl
        lastSeen
      }
      owner2 {
        id
        firstName
        lastName
        avatarUrl
        lastSeen
      }
    }
  }
`;

export const CONTACT_VEHICLES_SUBSCRIPTION = gql`
  subscription GetContactVehicles($id: ID) {
    GetContactVehicles(id: $id) {
      id
      reg
      vehicleType
      make
      model
      images {
        id
        url
      }
    }
  }
`;

export const CONTACT_BOOKINGS_SUBSCRIPTION = gql`
  subscription GetContactBookings($id: ID) {
    GetContactBookings(id: $id) {
      id
      paymentStatus
      earning
      startTime
      endTime
      declineReason
      paymentStatus
      isAccepted
      isDeclined
      isCancelled
      isLateReturn
      isCheckInComplete
      isCheckOutComplete
      freeCancellation
      isFixedPrice
      cancellationPercentage
      cancellationDescription
      bookingActivities {
        id
        name
        description
        date
      }
      vehicleRented {
        id
        reg
        vehicleType
        make
        model
        hourlyRates
        dailyRates
        status
        images {
          id
          url
        }
      }
      lender {
        id
        email
        firstName
        lastName
        lastSeen
        avatarUrl
      }
      borrower {
        id
        email
        firstName
        lastName
        lastSeen
        avatarUrl
      }
    }
  }
`;

export const BOOKING_ACTIVITIES_SUBSCRIPTION = gql`
  subscription GetBookingActivities($id: ID) {
    GetBookingActivities(id: $id) {
      id
      name
      description
      date
    }
  }
`;

export const VEHICLE_MESSAGES_SUBSCRIPTION = gql`
  subscription GetVehicleMessages($contactId: ID, $vehicleId: ID) {
    GetVehicleMessages(contactId: $contactId, vehicleId: $vehicleId) {
      id
      body
      contentType
      createdAt
      sender {
        id
        firstName
        lastName
        lastSeen
        email
        avatarUrl
      }
      receiver {
        id
        firstName
        lastName
        lastSeen
        email
        avatarUrl
      }
    }
  }
`;

export const BOOKING_MESSAGES_SUBSCRIPTION = gql`
  subscription GetBookingMessages($id: ID) {
    GetBookingMessages(id: $id) {
      id
      body
      contentType
      createdAt
      bookingChangeRequest {
        id
        isAccepted
        isDeclined
        declineReason
        startTime
        endTime
      }
      sender {
        id
        firstName
        lastName
        lastSeen
        email
        avatarUrl
      }
      receiver {
        id
        firstName
        lastName
        lastSeen
        email
        avatarUrl
      }
      breakDown {
        id
        reason
        description
        images {
          id
          url
        }
      }
      bookingReview {
        id
        communicationRating
        vehicleRating
        experienceRating
        comment
        postedAt
        user {
          id
        }
      }
    }
  }
`;

export const BOOKING_REVIEWS_SUBSCRIPTION = gql`
  subscription GetBookingReviews($id: ID) {
    GetBookingReviews(id: $id) {
      id
      communicationRating
      vehicleRating
      experienceRating
      comment
      postedAt
      user {
        id
        firstName
        lastName
        lastSeen
        email
        avatarUrl
      }
    }
  }
`;

export const ADD_INSURANCE_POLICY = gql`
  mutation AddInsurancePolicy($insurancePolicyContent: InsurancePolicyContent) {
    AddInsurancePolicy(insurancePolicyContent: $insurancePolicyContent) {
      id
      description
      name
      price
      policyUrl
    }
  }
`;

export const GET_INSURANCE_POLICY_BY_USERNAME = gql`
  query GetInsurancePolicyByUsername($username: String) {
    GetInsurancePolicyByUsername(username: $username) {
      id
      description
      price
      policyUrl
      name
    }
  }
`;

export const DELETE_INSURANCE_POLICY = gql`
  mutation DeleteInsurancePolicy($id: ID) {
    DeleteInsurancePolicy(id: $id) {
      status
      message
    }
  }
`;

export const BOOKING_EARNING_SUBSCRIPTION = gql`
  subscription GetBookingEarning($id: ID) {
    GetBookingEarning(id: $id) {
      id
      date
      amount
      fee
      status
      paymentStatus
      clientSecret
      paymentIntentId
    }
  }
`;

export const UPDATE_LAST_SEEN_SUBSCRIPTION = gql`
  subscription UserLastSeen($id: ID) {
    UserLastSeen(id: $id)
  }
`;
