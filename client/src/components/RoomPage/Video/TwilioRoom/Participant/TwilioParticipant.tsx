import { Component } from 'react';
import { addMessageToMessanger } from '../../../../../utils/twilio/twilioUtils';
import AudioTrack from '../AudioTrack/AudioTrack';
import VideoTrack from '../VideoTrack/VideoTrack';
import { Box } from '@material-ui/core';
class TwilioParticipant extends Component<any, any> {
  constructor(props: any) {
    super(props);

    const existingPublications = Array.from(
      this.props.participant!.tracks.values()
    );

    const existingTracks = existingPublications.map(
      (publication: any) => publication.track
    );

    const nonNullTracks = existingTracks.filter((track) => track !== null);

    this.state = {
      tracks: nonNullTracks,
    };

    console.log('constructor: ', this.state);
  }

  componentDidMount() {
    if (!this.props.localParticipant) {
      this.props.participant.on('trackSubscribed', (track: any) => {
        if (track.kind === 'data') {
          track.on('message', (data: any) => {
            addMessageToMessanger(JSON.parse(data));
          });
        } else {
          this.addTrack(track);
        }
      });

      this.props.participant.on('trackUnpublished', (track: any) => {
        this.removeTrack(track);
      });
      console.log('componentDidMoun: ', this.state);
    }
  }

  addTrack(track: any) {
    if (track) {
      this.setState({
        tracks: [...this.state.tracks, track],
      });
      console.log('addTrack: ', this.state);
    }
  }

  removeTrack(track: any) {
    if (track) {
      const newTracks = this.state.tracks.filter(
        (t: any) => t.name !== track.trackName
      );
      console.log('addTrack');

      this.setState({
        tracks: newTracks,
      });
      console.log('removeTrack: ', this.state);
    }
  }

  render() {
    return (
      <Box style={{ flexGrow: 1 }} id={this.props.participant.identity}>
        {
          // eslint-disable-next-line
          this.state.tracks.map((track: any) => {
            if (track.kind === 'audio') {
              return <AudioTrack key={track} track={track} />;
            }
            if (track.kind === 'video') {
              return <VideoTrack key={track} track={track} />;
            }
          })
        }
      </Box>
    );
  }
}

export default TwilioParticipant;
