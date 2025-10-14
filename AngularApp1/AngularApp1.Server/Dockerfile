# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["AngularApp1/AngularApp1.Server/AngularApp1.Server.csproj", "AngularApp1/AngularApp1.Server/"]
COPY ["eJobsAPI/eJobsAPI.csproj", "eJobsAPI/"]
COPY ["Erp.Domain/Erp.Domain.csproj", "Erp.Domain/"]
COPY ["AngularApp1/angularapp1.client/angularapp1.client.esproj", "AngularApp1/angularapp1.client/"]
RUN dotnet restore "./AngularApp1/AngularApp1.Server/AngularApp1.Server.csproj"
COPY . .
WORKDIR "/src/AngularApp1/AngularApp1.Server"
RUN dotnet build "./AngularApp1.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./AngularApp1.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AngularApp1.Server.dll"]