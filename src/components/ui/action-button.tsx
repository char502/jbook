export interface ActionButtonProps {
  classNameForIcon: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  classNameForIcon,
  onClick
}) => {
  return (
    <div>
      <button className='button is-primary is-small' onClick={onClick}>
        <span className='icon'>
          <i className={classNameForIcon}></i>
        </span>
      </button>
    </div>
  );
};

export default ActionButton;
