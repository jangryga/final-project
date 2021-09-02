import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(() => ({
  participant: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 14,
    paddingLeft: 30,
    cursor: 'pointer',
    fontSize: '1.2rem',
    color: '#555',
    fontWeight: 500,
    borderRadius: 10,
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#E6E8EA',
    },
  },
}));

export const Participant = (props: { identity: string }) => {
  const classes = styles();

  return (
    <div className={classes.participant}>
      <p> {props.identity} </p>
    </div>
  );
};
