import AlertTypeEnum from '../enums/alert-type.enum';

interface AlertMessageModel {
  title: string;
  description: string;
  alertType: AlertTypeEnum;
}

export default AlertMessageModel;
