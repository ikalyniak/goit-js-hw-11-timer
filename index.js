class CountdownTimer {
  constructor({selector, targetDate}) {
    this.refs = {
      days: document.querySelector(`${selector} [data-value="days"]`),
      hours: document.querySelector(`${selector} [data-value="hours"]`),
      mins: document.querySelector(`${selector} [data-value="mins"]`),
      secs: document.querySelector(`${selector} [data-value="secs"]`),
    };

    this.initial(targetDate);
  }

  initial(targetDate) {
    const id = setInterval(() => {
      const deltaTime = targetDate - Date.now();
      const timeComponents = this.getTimeComponents(deltaTime);

      this.updateTimerFace(timeComponents);
      if (deltaTime <= 0) this.stop(id,deltaTime);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = String(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    
    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  updateTimerFace({ days, hours, mins, secs }) {
    this.refs.days.textContent = `${days}`;
    this.refs.hours.textContent = `${hours}`;
    this.refs.mins.textContent = `${mins}`;
    this.refs.secs.textContent = `${secs}`;
  }

  stop(id, deltaTime) {
    clearInterval(id);
    this.updateTimerFace({ days: '0', hours: '00', mins: '00', secs: '00' });
    // console.log(this.getTimeComponents(deltaTime))
  }
};

const timer1 = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Aug 21, 2021'),
});

const timer2 = new CountdownTimer({
  selector: '#timer-2',
  targetDate: new Date('Jan 01, 2022'),
});

const timer3 = new CountdownTimer({
  selector: '#timer-3',
  targetDate: new Date('Jun 29, 2021 15:58:00'),
});