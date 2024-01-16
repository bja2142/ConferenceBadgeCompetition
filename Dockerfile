FROM python:3.9-slim-buster as build

WORKDIR /opt/BadgeCompetition

# hadolint ignore=DL3008
#RUN apt-get update \
#    && apt-get install -y --no-install-recommends \
#        build-essential \
#        libffi-dev \
#        libssl-dev \
#        git \
#    && apt-get clean \
#    && rm -rf /var/lib/apt/lists/* \
#    && python -m venv /opt/venv
RUN python -m venv /opt/venv


ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt /tmp/requirements.txt

RUN pip install --no-cache-dir -r /tmp/requirements.txt

COPY . /opt/BadgeCompetition


FROM python:3.9-slim-buster as release
WORKDIR /opt/BadgeCompetition

# hadolint ignore=DL3008
#RUN apt-get update \
#    && apt-get install -y --no-install-recommends \
#        libffi6 \
#        libssl1.1 \
#    && apt-get clean \
#    && rm -rf /var/lib/apt/lists/*

COPY --chown=1001:1001 . /opt/BadgeCompetition

RUN useradd \
    --no-log-init \
    --shell /bin/bash \
    -u 1001 \
    ctfd \
    && mkdir -p /var/log/BadgeCompetition /var/uploads \
    && chown -R 1001:1001 /var/log/BadgeCompetition /var/uploads /opt/BadgeCompetition \
    && chmod +x /opt/BadgeCompetition/docker-entrypoint.sh

COPY --chown=1001:1001 --from=build /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

USER 1001
EXPOSE 5000
ENTRYPOINT ["/opt/BadgeCompetition/docker-entrypoint.sh"]
