import React, { useEffect, useState } from 'react';
import { AiOutlineFileDone, AiOutlineUser } from 'react-icons/ai';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { BsWallet2, BsExclamationLg } from 'react-icons/bs';
import { MdDone } from 'react-icons/md';
import { HiInformationCircle } from 'react-icons/hi';
import useAuth from '../../hooks/useAuth';
import LoadingScreen from '../../components/LoadingScreen';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import useDroidDialog from '../../hooks/useDroidDialog';
import UpdatePasswordModal from './UpdatePasswordModal';
import UpdatePhoneNumberModal from './UpdatePhoneNumberModal';
import UpdateEmailModal from './UpdateEmailModal';
import Label from '../../components/Label';
import './AccountNew.css';
import { Tooltip } from 'reactstrap';
import StaffMembersListing from './StaffMembersListing';
import { UploadImage } from '../../utils/UploadImage';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  DEACTIVATE_ACCOUNT,
  GET_CURRENT_USER_DOCUMENTS,
  GET_STAFF_MEMBERS,
  GET_USER_CARDS,
  UPDATE_USER,
  UPLOAD_DOCUMENTS,
  ADD_INSURANCE_POLICY,
  GET_INSURANCE_POLICY_BY_USERNAME,
  DELETE_INSURANCE_POLICY
} from '../../graphql/Queries';
import { useSnackbar } from 'notistack';
import CompanyReview from '../../assets/img/company-review-img.jpg';
import UploadDocument from '../../components/upload/UploadDocument';
import PaymentMethodsListing from './Cards/PaymentMethodsListing';
import AccountUnderReview from './Popups/AccountUnderReview';
import AccountImage from '../../assets/img/account-review.png';
import AccountReviewImage from '../../assets/img/account-under-review.png';
import { LoadingButton } from '@mui/lab';
import { MAvatar } from 'src/components/@material-extend';
import Exclamation from 'src/assets/svg/exclamation-mark.svg';
const RootStyleProfile = styled('div')(({ theme }) => ({
  width: 150,
  height: 110,
  margin: 'auto'
}));

export default function AccountNew() {
  const theme = useTheme();
  const { onOpen, onClose } = useDroidDialog();

  const { user, updateUser: getUserNewInfo, logout } = useAuth();

  const initialUser = {
    id: user.id,
    businessName: user.businessName,
    address: user.address,
    address2: user.address2,
    city: user.city,
    country: user.country,
    description: user.description,
    postalCode: user.postalCode,
    cover: user.cover,
    defaultCard: user?.defaultCard,
    avatarUrl: user?.avatarUrl,
    license: user?.license,
    checkInCode: user?.checkInCode,
    licenseType: user?.licensesType,
    businessNumber: user?.businessNumber
  };

  const [open, setOpen] = useState(null);

  const [accountPopUpOpen, setAccountPopUpOpen] = useState(true);

  const [isMobileNotifications, setIsMobileNotifications] = useState(user.mobileNotifications);
  const [isEmailNotifications, setIsEmailNotifications] = useState(user.emailNotifications);

  const [pageIndex, setPageIndex] = useState(1);

  const [isDocumentVerified, setIsDocumentVerified] = useState('');
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [checkInCode, setCheckInCode] = useState(user?.checkInCode);
  const [license, setLicense] = useState(user?.license);
  const [companyNumber, setCompanyNumber] = useState(user?.businessNumber);
  const [licensesType, setLicensesType] = useState(user?.licenseType);
  const [IdFront, setIdFront] = useState(null);
  const [IdBack, setIdBack] = useState(null);
  const [IdProof, setIdProof] = useState(null);
  const [licensesFront, setLicensesFront] = useState(null);
  const [licensesBack, setLicensesBack] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [profileImage, setProfileImage] = useState(user?.avatarUrl || null);

  const [updateEmail, setUpdateEmail] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [updatePhone, setUpdatePhone] = useState(false);
  const [active, setActive] = React.useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const [UpdateUserInfo] = useMutation(UPDATE_USER);
  const [deactivateAccount, { loading: deactivateLoading }] = useMutation(DEACTIVATE_ACCOUNT);
  const [UpdateDocuments] = useMutation(UPLOAD_DOCUMENTS);
  const [getUserDocuments] = useLazyQuery(GET_CURRENT_USER_DOCUMENTS);
  const [getCards, { loading: paymentCardsLoading, error: paymentCardsError }] = useLazyQuery(GET_USER_CARDS);
  const [getMembers, { loading: staffMembersLoading, error: staffMembersError, data: staffMembersData }] =
    useLazyQuery(GET_STAFF_MEMBERS);

  const [getUserPolicy, { loading: insuranceLoading, error: insuranceError }] = useLazyQuery(GET_INSURANCE_POLICY_BY_USERNAME, {
    variables: { username: user?.userName || user?.email }
  });

  const [addInsurancePolicy] = useMutation(ADD_INSURANCE_POLICY);
  const [deleteInsurance] = useMutation(DELETE_INSURANCE_POLICY);

  const [insurancePolicies, setInsurancePolicies] = useState([
    { id: Date.now(), description: '', policy: null, price: null }
  ]);
  const setInsuranceDescription = (val, index) => {
    const updatedInsurancePolicies = insurancePolicies?.map((policy) => {
      if (policy.id === index) {
        return { ...policy, description: val };
      }
      return policy;
    });

    setInsurancePolicies(updatedInsurancePolicies);
  };
  const setInsuranceName = (val, index) => {
    const updatedInsurancePolicies = insurancePolicies?.map((policy) => {
      if (policy.id === index) {
        return { ...policy, name: val };
      }
      return policy;
    });

    setInsurancePolicies(updatedInsurancePolicies);
  };
  const setInsurancePrice = (val, index) => {
    const updatedInsurancePolicies = insurancePolicies?.map((policy) => {
      if (policy.id === index) {
        return { ...policy, price: val };
      }
      return policy;
    });

    setInsurancePolicies(updatedInsurancePolicies);
  };
  const setInsurancePolicy = (val, index) => {
    const updatedInsurancePolicies = insurancePolicies?.map((policy) => {
      if (policy.id === index) {
        return { ...policy, policy: val };
      }
      return policy;
    });

    setInsurancePolicies(updatedInsurancePolicies);
  };
  const deleteInsurancePolicy = async (index) => {
    const updatedInsurancePolicies = insurancePolicies.filter((policy) => policy.id !== index);

    setInsurancePolicies(updatedInsurancePolicies);

    await deleteInsurance({ variables: { id: index } });
  };
  useEffect(() => getMembers(), []);

  useEffect(async () => {
    if (user?.isVerified) setPageIndex(3);
  }, []);

  useEffect(() => getUserCards(), []);

  useEffect(async () => await getUserDocs(), []);

  useEffect(() => {
    if (pageIndex === 3) {
      getUserPolicy({ variables: { username: user?.username || user?.email } }).then((res) => {
        if (res?.data?.GetInsurancePolicyByUsername?.length !== 0) {
          setInsurancePolicies(res?.data?.GetInsurancePolicyByUsername);
        }
      });
    }
  }, [pageIndex]);

  const onNewInsurancePolicy = async (policyId) => {
    const policy = insurancePolicies.find((policy) => policy.id === policyId);

    const fileUp = await UploadImage(policy.policy);

    await addInsurancePolicy({
      variables: {
        insurancePolicyContent: {
          description: policy.description,
          policyUrl: fileUp,
          price: parseFloat(policy.price),
          name: policy.name
        }
      }
    });
  };

  const getUserCards = () =>
    getCards().then((res) => {
      setPaymentMethods(res?.data?.RetrieveUserCards);
      if (res?.data?.RetrieveUserCards?.length > 0 && user?.isVerified) {
        if (user?.isBusiness) {
          setPageIndex(4);
        } else {
          setPageIndex(1);
        }
      }
    });

  const getUserDocs = async () => {
    await getUserDocuments()
      .then((res) => {
        let doc_status = '';
        res?.data?.getUserDocuments?.map((d) => {
          if (d?.status === 'FAILED') {
            doc_status = d?.status;
          }
          if (d?.status === 'PROCESSING' && doc_status !== 'FAILED') {
            doc_status = d?.status;
          }
          if (doc_status !== 'PROCESSING' && doc_status !== 'FAILED') {
            doc_status = d?.status;
          }

          if (d?.type === 'ID_FRONT' || d?.type === 'GOVT_FRONT') {
            setIdFront({ id: d?.id, url: d?.url, status: d?.status, type: d?.type });
          }
          if (d?.type === 'ID_BACK' || d?.type === 'GOVT_BACK') {
            setIdBack({ id: d?.id, url: d?.url, status: d?.status, type: d?.type });
          }
          if (d?.type === 'LICENSE_FRONT') {
            setLicensesFront({ id: d?.id, url: d?.url, status: d?.status, type: d?.type });
          }
          if (d?.type === 'LICENSE_BACK') {
            setLicensesBack({ id: d?.id, url: d?.url, status: d?.status, type: d?.type });
          }
          if (d?.type === 'COMPANY_PROOF') {
            setIdProof({ id: d?.id, url: d?.url, status: d?.status, type: d?.type });
          }
        });
        if (user?.isBusiness) {
          if (res?.data?.getUserDocuments?.length > 2) setIsDocumentVerified(doc_status);
        } else {
          if (res?.data?.getUserDocuments?.length > 3) setIsDocumentVerified(doc_status);
        }
      })
      .catch((e) => console.log(e));
  };

  const onProfileImageChange = async (e) => {
    setLoadingUpdate(true);
    const fileUp = await UploadImage(e.target.files[0]);
    await UpdateUserInfo({
      variables: {
        user: {
          id: user.id,
          businessName: user.businessName,
          address: user.address,
          address2: user.address2,
          city: user.city,
          country: user.country,
          description: user.description,
          postalCode: user.postalCode,
          cover: user.cover,
          defaultCard: user?.defaultCard,
          avatarUrl: fileUp,
          license: license,
          checkInCode: checkInCode,
          licenseType: licensesType,
          businessNumber: companyNumber
        }
      }
    })
      .then((res) => {
        setProfileImage(fileUp);
        enqueueSnackbar('User profile photo updated successfully', {
          variant: 'success'
        });
      })
      .catch((error) => {
        enqueueSnackbar('User profile photo update failed', {
          variant: 'error'
        });
      });
    setLoadingUpdate(false);
  };

  const submitDocuments = async () => {
    setLoadingUpdate(true);
    const u = {
      id: user.id,
      businessName: user.businessName,
      address: user.address,
      address2: user.address2,
      city: user.city,
      country: user.country,
      description: user.description,
      postalCode: user.postalCode,
      cover: user.cover,
      avatarUrl: user.avatarUrl,
      defaultCard: user?.defaultCard,
      license: license,
      checkInCode: checkInCode,
      licenseType: licensesType,
      businessNumber: companyNumber
    };

    if (initialUser === u) {
      await UpdateUserInfo({
        variables: {
          user: {
            id: user.id,
            businessName: user.businessName,
            address: user.address,
            address2: user.address2,
            city: user.city,
            country: user.country,
            description: user.description,
            postalCode: user.postalCode,
            cover: user.cover,
            avatarUrl: user.avatarUrl,
            defaultCard: user?.defaultCard,
            license: license,
            checkInCode: checkInCode,
            licenseType: licensesType,
            businessNumber: companyNumber
          }
        }
      })
        .then((res) => {})
        .catch((error) => {});
    }

    const docs = await uploadDocuments();

    let isDocsChanged = false;

    docs.map((doc) => {
      if (!doc?.id) isDocsChanged = true;
    });

    if (isDocsChanged)
      await UpdateDocuments({ variables: { documents: docs } })
        .then((res) => {})
        .catch((error) => {});
    if (isDocsChanged) await getUserDocs();
    if (initialUser === u) {
      await getUserNewInfo();
    }
    setLoadingUpdate(false);
  };

  const uploadDocuments = async () => {
    const businessDocs = [];
    const userDocs = [];

    const newDocs = [];

    if (user?.isBusiness) {
      if (IdFront !== null) {
        if (!IdFront?.id) {
          businessDocs.push({ type: 'GOVT_FRONT', file: IdFront });
        } else {
          newDocs.push({ id: IdFront?.id, status: IdFront?.status, type: 'GOVT_FRONT', url: IdFront?.url });
        }
      }
      if (IdBack !== null) {
        if (!IdBack?.id) {
          businessDocs.push({ type: 'GOVT_BACK', file: IdBack });
        } else {
          newDocs.push({ id: IdBack?.id, status: IdBack?.status, type: 'GOVT_BACK', url: IdBack?.url });
        }
      }
      if (IdProof !== null) {
        if (!IdProof?.id) {
          businessDocs.push({ type: 'COMPANY_PROOF', file: IdProof });
        } else {
          newDocs.push({ id: IdProof?.id, status: IdProof?.status, type: 'COMPANY_PROOF', url: IdProof?.url });
        }
      }
      await Promise.all(
        (
          await businessDocs
        ).map(async (doc) => {
          const fileUp = await UploadImage(doc.file);
          // const fileUp = 'doc url';
          if (fileUp !== undefined) {
            newDocs.push({ type: doc.type, url: fileUp, status: 'PROCESSING' });
          }
          return fileUp;
        })
      );
    } else {
      if (IdFront !== null) {
        if (!IdFront?.id) {
          userDocs.push({ type: 'ID_FRONT', file: IdFront });
        } else {
          newDocs.push({ id: IdFront?.id, status: IdFront?.status, type: 'ID_FRONT', url: IdFront?.url });
        }
      }
      if (IdBack !== null) {
        if (!IdBack?.id) {
          userDocs.push({ type: 'ID_BACK', file: IdBack });
        } else {
          newDocs.push({ id: IdBack?.id, status: IdBack?.status, type: 'ID_BACK', url: IdBack?.url });
        }
      }
      if (licensesFront !== null) {
        if (!licensesFront?.id) {
          userDocs.push({ type: 'LICENSE_FRONT', file: licensesFront });
        } else {
          newDocs.push({
            id: licensesFront?.id,
            status: licensesFront?.status,
            type: 'LICENSE_FRONT',
            url: licensesFront?.url
          });
        }
      }
      if (licensesBack !== null) {
        if (!licensesBack?.id) {
          userDocs.push({ type: 'LICENSE_BACK', file: licensesBack });
        } else {
          newDocs.push({
            id: licensesBack?.id,
            status: licensesBack?.status,
            type: 'LICENSE_BACK',
            url: licensesBack?.url
          });
        }
      }
      await Promise.all(
        (
          await userDocs
        ).map(async (doc) => {
          // const fileUp = await UploadImage(doc.file);
          const fileUp = 'doc url';
          if (fileUp !== undefined) {
            newDocs.push({ type: doc.type, url: fileUp });
          }
          return fileUp;
        })
      );
    }

    return newDocs;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let introText = () => {
    return (
      <div id="greetingsContainer">
        {/*<p id="hello">Hello!</p>*/}
        <p id="title" style={{ color: theme.palette.text.primary }}>
          {user.isBusiness ? user.businessName : user.firstName + ' ' + user.lastName}
        </p>
        <p id="message" style={{ color: theme.palette.text.secondary }}>
          Just a few more steps before becoming a part of the vumah community
        </p>
      </div>
    );
  };

  let completionPercentageIcon = (profileImage) => {
    let thestyles = {
      backgroundImage: `conic-gradient(#f67810 360deg, #f3e5da 90deg)`
    };

    return (
      // <div id="completionPercentageIcon" style={thestyles}>
      //   <div
      //     id="percentageCompletion"
      //     style={{ backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f8f9fa' }}
      //   >
      //     <img src={profileImage ? profileImage : DefaultImg} alt="profile" className="profileImageIcon" />
      //   </div>
      // </div>
      <MAvatar
        src={profileImage || 'https://vumah-store.s3.us-east-2.amazonaws.com/8840868.jpg'}
        alt={profileImage ? profileImage : undefined}
        sx={{
          width: '100px',
          height: '100px'
        }}
      />
    );
  };

  let rowItem = (description, icon, pageNum) => {
    let status = 'inactive';
    let topClass = 'numberedIconInactive';
    let iconClass = 'numberedIconTextContainerCompleted';
    let color = theme.palette.text.primary;
    let completed = false;

    if (pageNum === 0) {
      completed = true;
    }

    if (user.isVerified && pageNum === 1) {
      completed = true;
    }

    if (paymentMethods?.length > 0 && pageNum === 2) {
      completed = true;
    }

    if (staffMembersData?.GetStaffMembers?.length > 0 && pageNum === 3) {
      completed = true;
    }

    if (pageNum === pageIndex - 1) {
      status = 'active';
    }

    if (completed) {
      topClass = 'numberedIconCompleted';
      iconClass = 'numberedIconTextContainerCompleted';
      color = theme.palette.text.primary;
    }

    // if (status === 'inactive') {
    //   topClass = 'numberedIconInactive';
    //   iconClass = 'numberedIconTextContainerInactive';
    //   color = theme.palette.text.primary;
    // }

    if (status === 'active') {
      topClass = 'numberedIconActive';
      iconClass = 'numberedIconTextContainerActive';
    }

    return (
      <div className="iconRow">
        <div className={topClass}>
          <p className="iconText">
            {completed ? <MdDone /> : <img src={Exclamation} alt="Exclamation" className="exclamation" />}
          </p>
        </div>
        {completed ? (
          <div
            className={iconClass}
            onClick={() => {
              setPageIndex(pageNum + 1);
            }}
          >
            <p style={{ color: color }}>
              {icon}
              {description}
            </p>
          </div>
        ) : (
          <div
            className={iconClass}
            onClick={() => {
              setPageIndex(pageNum + 1);
            }}
          >
            <p style={{ color: color }}>
              {icon}
              {description}
            </p>
          </div>
        )}
      </div>
    );
  };

  let avatarContainer = () => {
    return (
      <div id="avatarContainer">
        <p id="avatarText" style={{ color: theme.palette.text.primary }}>
          {user.isBusiness ? 'Business Logo' : 'Profile Image'}
        </p>

        <div
          style={{
            marginBottom: '16px',
            position: 'relative',
            borderRadius: '5px',
            overflow: 'hidden',
            width: '150px',
            marginTop: '16px'
          }}
        >
          <RootStyleProfile>
            <Box
              component="img"
              alt="avatar"
              src={profileImage ? profileImage : CompanyReview}
              sx={{ zIndex: 8, objectFit: 'cover' }}
            />
          </RootStyleProfile>
          <div className="p-image2">
            <label htmlFor="profile-image" className="mb-0 pointer">
              <i className="fa fa-camera car-upload-button" />
            </label>
            <input id="profile-image" type="file" accept="image/*" onChange={onProfileImageChange} />
          </div>
        </div>
        {/*{user.isBusiness ? (*/}
        {/*  <div className="squareImageContainer">*/}
        {/*    {file == '' ? (*/}
        {/*      <img*/}
        {/*        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHWxmQWF_DqtMfSfnw3AyS12OzmvdSmoAJIQ&usqp=CAU"*/}
        {/*        alt={file.name}*/}
        {/*        className="profileImageSquare"*/}
        {/*      />*/}
        {/*    ) : (*/}
        {/*      <img src={URL.createObjectURL(file)} alt={file.name} className="profileImageSquare" />*/}
        {/*    )}*/}
        {/*    <label className="editIcon">*/}
        {/*      <input className="imageUploader" onChange={handleUpload} type="file" accept="image/*" />*/}
        {/*      <p>*/}
        {/*        <FiEdit2></FiEdit2>*/}
        {/*      </p>*/}
        {/*    </label>*/}
        {/*    <div*/}
        {/*      className="removeImageIcon"*/}
        {/*      onClick={() => {*/}
        {/*        setFile('');*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      <p>*/}
        {/*        <ImCancelCircle></ImCancelCircle>*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*) : (*/}
        {/*  <div className="roundImageContainer">*/}
        {/*    {file == '' ? (*/}
        {/*      <img*/}
        {/*        src="https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png"*/}
        {/*        alt={file.name}*/}
        {/*        className="profileImageRounded"*/}
        {/*      />*/}
        {/*    ) : (*/}
        {/*      <img src={URL.createObjectURL(file)} alt={file.name} className="profileImageRounded" />*/}
        {/*    )}*/}
        {/*    <label className="editIcon">*/}
        {/*      <input className="imageUploader" onChange={handleUpload} type="file" accept="image/*" />*/}
        {/*      <p>*/}
        {/*        <FiEdit2></FiEdit2>*/}
        {/*      </p>*/}
        {/*    </label>*/}
        {/*    <div*/}
        {/*      className="removeImageIcon"*/}
        {/*      onClick={() => {*/}
        {/*        setFile('');*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      <p>*/}
        {/*        <ImCancelCircle></ImCancelCircle>*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    );
  };

  let rightSideInfoRowEmail = () => {
    return (
      <div className="rightSideInfoRow">
        <p className="inputLabel" style={{ color: theme.palette.text.primary }}>
          Email
        </p>
        <div className="inputContainer">
          <div
            className="input"
            style={{
              backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f3f3f3',
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark' ? '#000' : '#fff'
            }}
          >
            <p className="placeholderText">{user.email}</p>
          </div>

          <div
            onClick={() => {
              onOpen(
                'Update Email',
                <>
                  <UpdateEmailModal userEmail={user.email} />
                </>
              );
            }}
            className="inputButtonOnRight"
          >
            <p>Update</p>
          </div>
        </div>
      </div>
    );
  };

  let rightSideInfoRowPassword = () => {
    return (
      <div className="rightSideInfoRow">
        <p className="inputLabel" style={{ color: theme.palette.text.primary }}>
          Password
        </p>
        <div className="inputContainer">
          <div
            className="input"
            style={{
              backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f3f3f3',
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark' ? '#000' : '#fff'
            }}
          >
            <p className="placeholderText">*************</p>
          </div>
          <div
            onClick={() => {
              onOpen(
                'Update Password',
                <>
                  <UpdatePasswordModal />
                </>
              );
            }}
            className="inputButtonOnRight"
          >
            <p>Update</p>
          </div>
        </div>
      </div>
    );
  };

  let rightSideInfoRowPhone = () => {
    return (
      <div className="rightSideInfoRow">
        <p className="inputLabel" style={{ color: theme.palette.text.primary }}>
          Phone
        </p>
        <div className="inputContainer">
          <div
            className="input"
            style={{
              backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f3f3f3',
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark' ? '#000' : '#fff'
            }}
          >
            <p className="placeholderText">{user.phoneNumber}</p>
          </div>
          <div
            onClick={() => {
              onOpen('Update Phone Number', <UpdatePhoneNumberModal />);
            }}
            className="inputButtonOnRight"
          >
            <p>Update</p>
          </div>
        </div>
      </div>
    );
  };

  let addressContainer = () => {
    return (
      <div className="addressContainer">
        <p id="addressTitle" style={{ color: theme.palette.text.primary }}>
          {user.isBusiness ? 'Business Address' : 'Address'}
        </p>
        <div className="addressPortionContainer">
          <div className="addressPortionRow">
            <p className="inputLabel" style={{ color: theme.palette.text.primary }}>
              Street Address 1
            </p>
            <div className="inputContainer">
              <input
                type="text"
                className="input"
                style={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f3f3f3',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
                  color: theme.palette.text.primary
                }}
                placeholder={user.address}
              ></input>
            </div>
          </div>
          <div className="addressPortionRow">
            <p className="inputLabel" style={{ color: theme.palette.text.primary }}>
              Street Address 2
            </p>
            <div className="inputContainer">
              <input
                type="text"
                className="input"
                style={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f3f3f3',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
                  color: theme.palette.text.primary
                }}
                placeholder={user.address2}
              ></input>
            </div>
          </div>
          <div className="addressPortionRow">
            <p className="inputLabel" style={{ color: theme.palette.text.primary }}>
              City
            </p>
            <div className="inputContainer">
              <input
                type="text"
                className="input"
                style={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f3f3f3',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
                  color: theme.palette.text.primary
                }}
                placeholder={user.city}
              ></input>
            </div>
          </div>
          <div className="addressPortionRow">
            <p className="inputLabel" style={{ color: theme.palette.text.primary }}>
              Country (Optional)
            </p>
            <div className="inputContainer">
              <input
                type="text"
                className="input"
                style={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f3f3f3',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
                  color: theme.palette.text.primary
                }}
                placeholder={user.country}
              ></input>
            </div>
          </div>
          <div className="addressPortionRow">
            <p className="inputLabel" style={{ color: theme.palette.text.primary }}>
              Postcode
            </p>
            <div className="inputContainer">
              <input
                type="text"
                className="input"
                style={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f3f3f3',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
                  color: theme.palette.text.primary
                }}
                placeholder={user.postalCode}
              ></input>
            </div>
          </div>
        </div>
      </div>
    );
  };

  let subscriptionsButtonsContainer = () => {
    return (
      <div id="subscriptionsButtonsContainer">
        <div className="subscribeButton">
          <p className="inputLabel" style={{ color: theme.palette.text.primary }}>
            Mobile Notification
          </p>
          <div
            onClick={() => {
              if (isMobileNotifications == false) {
                setIsMobileNotifications(true);
              } else {
                setIsMobileNotifications(false);
              }
            }}
            className="mobileSubscribeButton"
          >
            {isMobileNotifications == true ? (
              <div className="ballContainerActive">
                <div className="ballActive" />
              </div>
            ) : (
              <div className="ballContainerInactive">
                <div className="ballInactive" />
              </div>
            )}
          </div>
        </div>
        <div className="subscribeButton">
          <p className="inputLabel" style={{ color: theme.palette.text.primary }}>
            Email Notification
          </p>
          <div
            onClick={() => {
              if (isEmailNotifications == false) {
                setIsEmailNotifications(true);
              } else {
                setIsEmailNotifications(false);
              }
            }}
            className="emailSubscribeButton"
          >
            {isEmailNotifications == true ? (
              <div className="ballContainerActive">
                <div className="ballActive" />
              </div>
            ) : (
              <div className="ballContainerInactive">
                <div className="ballInactive" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  function onChangeSelectedLicenseType(e, name) {
    e.preventDefault();
    setLicensesType(name);
  }

  const [isOpenDriversLicense, setIsOpenDriversLicense] = useState(false);
  const toggleToolTipDriversLicense = () => {
    setIsOpenDriversLicense(!isOpenDriversLicense);
  };
  const [isOpenProvisionalPassport, setIsOpenProvisionalPassport] = useState(false);
  const toggleToolTipProvisionalPassport = () => {
    setIsOpenProvisionalPassport(!isOpenProvisionalPassport);
  };
  const [isOpenCompanyAddress, setIsOpenCompanyAddress] = useState(false);
  const toggleToolTipCompanyAddress = () => {
    setIsOpenCompanyAddress(!isOpenCompanyAddress);
  };
  const [isOpenMotorcycleLicenseType, setIsOpenMotorcycleLicenseType] = useState(false);
  const toggleToolTipMotorcycleLicenseType = () => {
    setIsOpenMotorcycleLicenseType(!isOpenMotorcycleLicenseType);
  };
  const uploadAreaTitle = (title, isOpen, toggleIsOpen, ToolTipText, id) => {
    return (
      <p style={{ color: theme.palette.text.primary, marginBottom: '1em' }}>
        {title}
        <HiInformationCircle className="infoIcon" id={id}></HiInformationCircle>
        <Tooltip placement="right" isOpen={isOpen} target={id} toggle={toggleIsOpen}>
          {ToolTipText}
        </Tooltip>
      </p>
    );
  };

  let uploadArea = (message, file, setFile) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '45%',
          height: 'auto'
        }}
      >
        {file ? (
          <>
            {file?.id ? (
              <>
                {file?.status !== 'FAILED' ? (
                  <Box
                    sx={{
                      width: '100%',
                      outline: 'none',
                      display: 'flex',
                      overflow: 'hidden',
                      textAlign: 'center',
                      position: 'relative',
                      alignItems: 'center',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      opacity: 0.72,
                      height: '220px',
                      padding: theme.spacing(5, 0),
                      borderRadius: 1,
                      transition: theme.transitions.create('padding'),
                      backgroundColor: theme.palette.background.neutral,
                      border: `1px dashed ${theme.palette.grey[500_32]}`
                    }}
                  >
                    <Box
                      sx={{
                        top: 8,
                        borderRadius: 1,
                        objectFit: 'cover',
                        position: 'absolute',
                        width: 'calc(100% - 16px)',
                        height: 'calc(100% - 16px)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: theme.palette.background.paper
                      }}
                    >
                      <Stack direction="row" spacing={1}>
                        <Typography variant="body1" sx={{ alignText: 'center', color: 'text.disabled' }}>
                          Document status:
                        </Typography>
                        <Label color={file?.status === 'VERIFIED' ? 'success' : 'warning'}>{file?.status}</Label>
                      </Stack>
                    </Box>
                  </Box>
                ) : (
                  <>
                    <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                      <Typography variant="body1" sx={{ alignText: 'center', color: 'text.disabled' }}>
                        Document status:
                      </Typography>
                      <Label color={file?.status === 'SUCCESS' ? 'success' : 'warning'}>{file?.status}</Label>
                    </Stack>
                    <UploadDocument file={file} setFile={setFile} sx={{}} />
                  </>
                )}
              </>
            ) : (
              <>
                <UploadDocument file={file} setFile={setFile} sx={{}} />
              </>
            )}
          </>
        ) : (
          <>
            <UploadDocument file={file} setFile={setFile} sx={{}} />
          </>
        )}

        <p className="des" style={{ color: theme.palette.text.primary }}>
          {message}
        </p>
      </div>
    );
  };

  let uploadSection = () => {
    let temp;

    if (user.isBusiness) {
      temp = (
        <>
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <p style={{ fontWeight: '600', color: theme.palette.text.primary }}>Company House Number</p>
              {user.isVerified ? (
                <p className="ml-3 mr-2" style={{ color: theme.palette.success.main }}>
                  <i className="fas fa-check margin-right-five" />
                  Approved
                </p>
              ) : (
                <p className="ml-3 mr-2" style={{ whiteSpace: 'nowrap' }}>
                  <i className="fas fa-minus margin-right-five" />
                  Not Approved
                </p>
              )}
            </div>
            <input
              type="text"
              className="input"
              onChange={(e) => setCompanyNumber(e.target.value)}
              style={{
                backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f3f3f3',
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
                width: '100%',
                marginTop: '1em',
                color: theme.palette.text.primary
              }}
              value={companyNumber}
              placeholder={'Please Enter you Company Number'}
            ></input>
            <div></div>
            {/* <ApprovalStatus></ApprovalStatus> */}
          </div>
          <div className="uploadSection">
            {uploadAreaTitle(
              'ID Document',
              isOpenDriversLicense,
              toggleToolTipDriversLicense,
              <span>
                Front picture of Drivers Licence, Passport, or any other government official identification document
              </span>,
              'driversLicenseFileUploadsContainerBusinessToolTip'
            )}
            <div id="driversLicenseFileUploadsContainer">
              {uploadArea('Upload Front of Government Official Identification Document', IdFront, setIdFront)}
            </div>
          </div>
          <div></div>
          <div className="uploadSection" style={{ marginTop: '4em' }}>
            {uploadAreaTitle(
              'Proof of Company Address',
              isOpenCompanyAddress,
              toggleToolTipCompanyAddress,
              <span>Ask from Rphael</span>,
              'passportFileUploadsContainerBusinessToolTip'
            )}
            <div id="passportFileUploadsContainer">{uploadArea('Upload Proof', IdProof, setIdProof)}</div>
          </div>
        </>
      );
    } else {
      temp = (
        <>
          <div className="uploadSection">
            <div className="inputContainer">
              <input
                type="text"
                className="input"
                onChange={(e) => setLicense(e.target.value)}
                style={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f3f3f3',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
                  color: theme.palette.mode === 'dark' ? '#fff' : '#000'
                }}
                value={license}
                placeholder="Driver License Number"
              ></input>
            </div>
          </div>
          <div className="uploadSection">
            <div className="inputContainer">
              <input
                type="text"
                className="input"
                onChange={(e) => setCheckInCode(e.target.value)}
                style={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f3f3f3',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
                  color: theme.palette.mode === 'dark' ? '#fff' : '#000'
                }}
                value={checkInCode}
                placeholder="check in code"
              ></input>
              <a
                style={{
                  textDecoration: 'underline',
                  color: 'blue',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '1rem'
                }}
                target="_blank"
                href="https://www.viewdrivingrecord.service.gov.uk/driving-record/licence-number"
              >
                Get check in code
              </a>
            </div>
          </div>

          {/*{Boolean(*/}
          {/*  licensesFront !== null ||*/}
          {/*    licensesBack !== null ||*/}
          {/*    (licensesFront === null && licensesBack === null && IdFront === null && IdBack === null)*/}
          {/*) && (*/}
          {/*)}*/}
          <div className="uploadSection">
            {uploadAreaTitle(
              'Drivers License',
              isOpenDriversLicense,
              toggleToolTipDriversLicense,
              <span>A Full drivers licence is required to rent cars, camper vans and Motor homes.</span>,
              'driversLicenseFileUploadsContainerUserToolTip'
            )}
            <div id="driversLicenseFileUploadsContainer">
              {uploadArea('Upload Front of License', licensesFront, setLicensesFront)}
              {uploadArea('Upload Back of License', licensesBack, setLicensesBack)}
            </div>
          </div>

          <div>
            <p id="OR" style={{ color: theme.palette.text.primary }}>
              OR
            </p>
          </div>

          <div className="uploadSection">
            {uploadAreaTitle(
              'Provisional/Passport',
              isOpenProvisionalPassport,
              toggleToolTipProvisionalPassport,
              <span>
                Either a provisional license or a passport will be required to rent bicycles and any non registered
                vehicles.
              </span>,
              'passportFileUploadsContainerUserToolTip'
            )}
            <div id="passportFileUploadsContainer">
              {uploadArea('Upload Front of ID', IdFront, setIdFront)}
              {uploadArea('Upload Back of ID', IdBack, setIdBack)}
            </div>
          </div>
          <div className="uploadSection">
            {uploadAreaTitle(
              'Motorcycles License Types',
              isOpenMotorcycleLicenseType,
              toggleToolTipMotorcycleLicenseType,
              <p className="pt-3 pb-3">
                If you have a motorcycle license please select which box applies to you:
                <br />
                <hr />
                A1 (Motorcycles upto 125cc)
                <br />
                <hr />
                A2 (Riders aged 24+ are qualified for any motorcycle however if under the age of 24 the user will only
                be qualified for motorcycles up to 46Bhp)
                <br />
                <hr />A (Any Motorcycle)
              </p>,
              'motorCycleLicenseTypeSelectUserToolTip'
            )}
            <div className="d-flex mt-4">
              <button
                className={`${
                  licensesType === 'A1' ? 'btn-without-radius' : 'common-white-btn-without-radius'
                } margin-right-ten`}
                onClick={(e) => onChangeSelectedLicenseType(e, 'A1')}
              >
                A1
              </button>
              <button
                className={`${
                  licensesType === 'A2' ? 'btn-without-radius' : 'common-white-btn-without-radius'
                } margin-right-ten`}
                onClick={(e) => onChangeSelectedLicenseType(e, 'A2')}
              >
                A2
              </button>
              <button
                className={`${
                  licensesType === 'A' ? 'btn-without-radius' : 'common-white-btn-without-radius'
                } margin-right-ten`}
                onClick={(e) => onChangeSelectedLicenseType(e, 'A')}
              >
                A
              </button>
            </div>
          </div>
        </>
      );
    }

    return temp;
  };

  const InsuranceUploadSection = ({
    insurance,
    setInsuranceDescription,
    setInsurancePolicy,
    setInsurancePrice,
    setInsuranceName,
    deleteInsurancePolicy,
    index
  }) => {
    const [description, setDescription] = useState(insurance.description);
    const [name, setName] = useState(insurance.name);
    const [price, setPrice] = useState(insurance.price);
    const [isOpenInsurancePolicy, setIsOpenInsurancePolicy] = useState(false);
    const toggleToolTipInsurancePolicy = () => {
      setIsOpenInsurancePolicy(!isOpenInsurancePolicy);
    };
    return (
      <div
        style={{
          backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f3f3f3',
          border: '1px solid',
          borderColor: '#f67810',
          padding: '10px',
          marginBottom: '10px'
        }}
      >
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '15px' }}>
            <p style={{ fontWeight: '600', color: theme.palette.text.primary }}>{index + 1}. Insurance Policy</p>
            <p
              onClick={() => deleteInsurancePolicy(insurance.id)}
              className="ml-3 mr-2"
              style={{ cursor: 'pointer', color: 'primary' }}
            >
              <i className="fas fa-trash margin-right-five" />
              Delete
            </p>
          </div>
          <FormControl style={{ marginBottom: '15px' }} fullWidth>
            <InputLabel htmlFor="outlined-adornment-name">Policy Name</InputLabel>
            <OutlinedInput
              type="text"
              // className="input"
              onBlur={() => setInsuranceName(name, insurance.id)}
              onChange={(e) => setName(e.target.value)}
              // style={{
              //   backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f3f3f3',
              //   border: '1px solid',
              //   borderColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
              //   width: '100%',
              //   marginTop: '1em',
              //   color: theme.palette.text.primary
              // }}
              value={name}
              placeholder={'Please Enter policy name'}
            />
          </FormControl>

          <FormControl style={{ marginBottom: '15px' }} fullWidth>
            <InputLabel htmlFor="outlined-adornment-description">Policy Description</InputLabel>
            <OutlinedInput
              type="text"
              // className="text-area-input"
              onBlur={() => setInsuranceDescription(description, insurance.id)}
              onChange={(e) => setDescription(e.target.value)}
              // style={{
              //   backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f3f3f3',
              //   border: '1px solid',
              //   borderColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
              //   width: '100%',
              //   marginTop: '1em',
              //   color: theme.palette.text.primary
              // }}
              rows={10}
              value={description}
              placeholder="Please enter insurance policy description"
            />
          </FormControl>
          <FormControl style={{ marginBottom: '15px' }} fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">Policy Price</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              label="policy price"
              type="number"
              startAdornment={<InputAdornment position="start">£</InputAdornment>}
              onBlur={() => setInsurancePrice(price, insurance.id)}
              onChange={(e) => setPrice(e.target.value)}
              // style={{
              //   backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f3f3f3',
              //   border: '1px solid',
              //   borderColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
              //   width: '100%',
              //   marginTop: '1em',
              //   color: theme.palette.text.primary
              // }}
              value={price}
              placeholder="Policy Price"
            />
          </FormControl>
        </div>
        <div className="uploadSection">
          {uploadAreaTitle(
            'Insurance policy',
            isOpenInsurancePolicy,
            toggleToolTipInsurancePolicy,
            <span>Upload insurance policy</span>,
            'insurancePolicyFileUploadsContainerBusinessToolTip'
          )}
          <div id="insurancePolicyFileUploadsContainer">
            {uploadArea('Upload Insurance Policy Document', insurance.policy, (val) =>
              setInsurancePolicy(val, insurance.id)
            )}
          </div>
        </div>
        <br />
        <br />
        <Button
          onClick={async () => {
            onNewInsurancePolicy(insurance.id);
          }}
          variant="contained"
          color={'primary'}
          sx={{
            height: '3em',
            width: '15em',
            borderRadius: '50px',
            transition: 'all 0.4s'
          }}
        >
          Save
        </Button>
      </div>
    );
  };

  let submitButtonArea = (pagenum) => {
    if (user.isBusiness) {
      if (pagenum > 4) {
        pagenum = 4;
      }
    } else {
      if (pagenum > 3) {
        pagenum = 3;
      }
    }

    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: '2em'
        }}
      >
        {pageIndex === 1 && (
          <Button
            onClick={async () => {
              setPageIndex(pagenum);
              window.scrollTo(0, 0);
            }}
            variant="contained"
            color={'primary'}
            sx={{
              height: '3em',
              width: '15em',
              borderRadius: '50px',
              transition: 'all 0.4s'
            }}
          >
            Submit
          </Button>
        )}
        {pageIndex === 2 && (
          <>
            {/*{isDocumentVerified === 'VERIFIED' ? (*/}
            <Button
              onClick={async () => {
                await submitDocuments();
                setPageIndex(pagenum);
                window.scrollTo(0, 0);
              }}
              variant="contained"
              color={'primary'}
              sx={{
                height: '3em',
                width: '15em',
                borderRadius: '50px',
                transition: 'all 0.4s'
              }}
              // disabled={isDocumentVerified !== 'VERIFIED'}
            >
              Submit
            </Button>
            {/*) : (*/}
            {/*  <Button*/}
            {/*    onClick={async () => {*/}
            {/*      await submitDocuments();*/}
            {/*    }}*/}
            {/*    variant="contained"*/}
            {/*    color={'primary'}*/}
            {/*    sx={{*/}
            {/*      height: '3em',*/}
            {/*      width: '24em',*/}
            {/*      borderRadius: '50px',*/}
            {/*      transition: 'all 0.4s'*/}
            {/*    }}*/}
            {/*    disabled={!getDocStatusForUpload()}*/}
            {/*  >*/}
            {/*    Upload documents for verification*/}
            {/*  </Button>*/}
            {/*)}*/}
          </>
        )}
        {pageIndex === 3 && (
          <Button
            onClick={async () => {
              setPageIndex(pagenum);
              window.scrollTo(0, 0);
            }}
            variant="contained"
            color={'primary'}
            sx={{
              height: '3em',
              width: '15em',
              borderRadius: '50px',
              transition: 'all 0.4s'
            }}
          >
            continue
          </Button>
        )}
      </div>
    );
  };

  function mainPage(index) {
    return (
      <div
        id="mainPage"
        style={{
          backgroundColor: theme.palette.background.neutral
        }}
      >
        <div id="accountNewContainer">
          {introText()}
          <div style={{ flexDirection: 'row', display: 'flex' }}>
            <div id="leftSideBar">
              <div
                className="leftSideBarContainer"
                style={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f8f9fa',
                  boxShadow: theme.palette.mode === 'dark' ? theme.shadows[0] : theme.shadows[10]
                }}
              >
                {completionPercentageIcon(profileImage)}
                {user?.isBusiness ? (
                  <div id="leftSideBarRows">
                    {rowItem('Account Information', <AiOutlineUser className="icon" />, 0)}
                    {rowItem('Document Upload', <IoDocumentTextOutline className="icon" />, 1)}
                    {rowItem('Insurance Upload', <IoDocumentTextOutline className="icon" />, 2)}
                    {rowItem('Payment Method', <BsWallet2 className="icon" />, 3)}
                    {rowItem('Account Access', <AiOutlineFileDone className="icon" />, 4)}
                  </div>
                ) : (
                  <div id="leftSideBarRows">
                    {rowItem('Account Information', <AiOutlineUser className="icon" />, 0)}
                    {rowItem('Document Upload', <IoDocumentTextOutline className="icon" />, 1)}
                    {rowItem('Payment Method', <BsWallet2 className="icon" />, 2)}
                  </div>
                )}
                <div id="deactivationButton" onClick={handleClickOpen}>
                  <p>Deactivate My Account</p>
                </div>
              </div>
            </div>
            <div id="infoRight">
              <div
                id="infoRightContainer"
                style={{
                  position: 'relative',
                  backgroundColor: theme.palette.mode === 'dark' ? '#28293d' : '#f8f9fa',
                  boxShadow: theme.palette.mode === 'dark' ? theme.shadows[0] : theme.shadows[10]
                }}
              >
                {loadingUpdate ? (
                  <LoadingScreen />
                ) : (
                  <>
                    {index === 1 && (
                      <>
                        {avatarContainer()}
                        {rightSideInfoRowEmail()}
                        {rightSideInfoRowPassword()}
                        {rightSideInfoRowPhone()}
                        {addressContainer()}
                        {subscriptionsButtonsContainer()}
                      </>
                    )}
                    {index === 2 && (
                      <>
                        {isDocumentVerified === 'PROCESSING' && (
                          <AccountUnderReview
                            image={AccountReviewImage}
                            setAccountPopUpOpen={setAccountPopUpOpen}
                            title="Account Under Review"
                            message="Your documents and information have been sent for review. We will notify once your profile is verified."
                          />
                        )}
                        {isDocumentVerified === 'FAILED' && (
                          <AccountUnderReview
                            image={AccountImage}
                            status={isDocumentVerified}
                            setAccountPopUpOpen={setAccountPopUpOpen}
                            title="Account Review Failed"
                            message="Please ensure you have provided us with the correct information"
                          />
                        )}
                        {isDocumentVerified === 'ON_HOLD' && (
                          <AccountUnderReview
                            image={AccountImage}
                            setAccountPopUpOpen={setAccountPopUpOpen}
                            title="Your Account Is On Hold"
                            message="You have exceeded the maximum attempt limit for account review. Please contact us here"
                          />
                        )}
                        {uploadSection()}
                      </>
                    )}
                    {index === 3 &&
                     insuranceLoading ? <LoadingScreen/>:(
                        <>
                          {insurancePolicies?.length > 0 &&
                            insurancePolicies?.map((insurance, index) => (
                              <InsuranceUploadSection
                                key={insurance.id}
                                insurance={insurance}
                                setInsuranceDescription={setInsuranceDescription}
                                setInsurancePolicy={setInsurancePolicy}
                                setInsurancePrice={setInsurancePrice}
                                setInsuranceName={setInsuranceName}
                                deleteInsurancePolicy={deleteInsurancePolicy}
                                index={index}
                              />
                            ))}
                          {insurancePolicies?.length < 5 && (
                            <Button
                              onClick={async () => {
                                setInsurancePolicies([
                                  ...insurancePolicies,
                                  { id: Date.now(), description: '', policy: null }
                                ]);
                              }}
                              variant="contained"
                              color={'primary'}
                              sx={{
                                height: '3em',
                                width: '15em',
                                borderRadius: '50px',
                                transition: 'all 0.4s'
                              }}
                            >
                              + Add Policy
                            </Button>
                          )}
                        </>)
                    }
                    {index === 4 && (
                      <PaymentMethodsListing
                        getCards={getUserCards}
                        paymentMethods={paymentMethods}
                        loading={paymentCardsLoading}
                        error={paymentCardsError}
                      />
                    )}
                    {index === 5 && (
                      <StaffMembersListing
                        loading={staffMembersLoading}
                        data={staffMembersData}
                        error={staffMembersError}
                        getMembers={getMembers}
                      />
                    )}
                    <hr />
                    {submitButtonArea(index + 1)}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (staffMembersLoading || paymentCardsLoading) return <LoadingScreen />;

  return (
    <>
      {user ? (
        <>
          {mainPage(pageIndex)}
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle style={{ color: theme.palette.text.primary }}>
              {active ? 'Are you sure?' : 'Sorry to see you go!'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText style={{ color: theme.palette.text.primary }}>
                {active
                  ? 'If you wish to continue to use the platform after this action you will be required to create a new account'
                  : '>-<'}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <LoadingButton
                loading={deactivateLoading}
                onClick={() => {
                  deactivateAccount()
                    .then(() => {
                      enqueueSnackbar('Account deactivated successfully', {
                        variant: 'success'
                      });
                      handleClose();
                      logout().then(() => {});
                    })
                    .catch(() => {
                      enqueueSnackbar('User failed to deactivated', {
                        variant: 'success'
                      });
                    });
                }}
                autoFocus
              >
                Deactivate
              </LoadingButton>
            </DialogActions>
          </Dialog>
          );
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
